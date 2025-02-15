export default [
    {value_usd: 100, type: 'bill'},
    {value_usd:  50, type: 'bill'},
    {value_usd:  20, type: 'bill'},
    {value_usd:  10, type: 'bill'},
    {value_usd:   5, type: 'bill'},
    // do not count on your register having $2 bills
    {value_usd:   1, type: 'bill'},

    // do not count on your register having $1 coins
    {value_usd: 0.25, type: 'coin'},
    {value_usd: 0.10, type: 'coin'},
    {value_usd: 0.05, type: 'coin'},
    // TODO: Victorian mode for thruppence
    // TODO: Victorian mode for tuppence
    {value_usd: 0.01, type: 'coin'},
    // TODO: Victorian mode for ha'penny
]