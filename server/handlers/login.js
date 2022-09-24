const apollo_client = require("../utils/apollo");
const GET_USER = require("../graphql/get_user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const loginhandler = async(req, res) => {
    const email = req.body.input.email;
    let data = await apollo_client.query({
        query: GET_USER,
        variables: { email },
    });

    if (data.data.users.length == 0) {
        res.json({
            status: false,
            message: "email not found, please sign up first"
        });
        return
    }
    const isValidPassword = bcrypt.compareSync(
      req.body.input.password,
      data.data.users[0].password
    );
    if (!isValidPassword) {
        res.json({
            status: false,
            message: "Invalid Password"
        });
        return
    }

    const payload = {
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": data.data.users[0].id,
        },
        metadata: {
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": data.data.users[0].id,
        },
    };
    const token = jwt.sign(payload, process.env.HASURA_GRAPHQL_JWT_SECRETS, {
        algorithm: "HS256",
    });

    res.json({
        token: token,
        status: true,
        message: "success"
    });


}