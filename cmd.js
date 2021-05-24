const { prefix } = require('./config.json')


module.exports = (client, aliases , callback) => {
    if (typeof aliases == 'string') {
        aliases = [aliases]
    }
    
    client.on('message', message => {
        const { content } = message;
        const userAuthor = message.author.toString();
        aliases.forEach(alias => {
            const command = `${prefix}${alias}`
            if(content.startsWith(`${command}`) || content == command){
                console.log('\n--------------------------------------' + '\r\n' + `Runnig: ${command} \r\nFrom: ${userAuthor}\r\nIn: ${new Date()}` + '\r\n' + '--------------------------------------\n' )
                callback(message)
            }
        })
    })
}