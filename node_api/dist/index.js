import express from 'express';
import { make_change } from "@unitedthoughts/wind-of-change";
const app = express();
const port = 3000;
app.get('/purchases/:amount', (request, response) => {
    let amount = Number(request.params.amount);
    let change_stacks = make_change(amount);
    response.json(change_stacks);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
