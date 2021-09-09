// Funcion para contruir el ws los colores etc 
async function getWorkspace(user_db) {
    await db.get('config').catch(function(err) {
        if (err.name === 'not_found') {
            return {
                _id: 'config',
                background: 'blue',
                foreground: 'white',
                sparkly: 'false'
            };
        } else { // hm, some other error
            throw err;
        }
    }).then(function(configDoc) {
        // sweet, here is our configDoc
    }).catch(function(err) {
        // handle any errors
    });
}