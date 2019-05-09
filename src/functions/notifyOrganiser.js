exports.handler = async (event) => {
    console.log(JSON.parse(event.Records[0].Sns.Message))
}