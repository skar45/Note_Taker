fs = require('fs');
let counter = 0;

function router(app){
    app.get("/", function(req, res) {
        res.json(path.join("public/index.html"));
    });

    app.get('/notes',function(req,res){
        const notes = fs.readFileSync('./public/notes.html','utf-8')
        res.send(notes)
    })

    app.get(`/api/notes`,function(req,res){
        const file = fs.readFileSync('./app/db.json','utf-8')
        console.log('reading file: ', file)
        res.send(file)
    })

    app.post('/api/notes', function(req,res){
        let note = req.body;
        let file = JSON.parse(fs.readFileSync('./app/db.json','utf-8'))

        
        note.id = Date.now();

        if (file === ''){
            file = []
        }

        file.push(note)
        const result= fs.writeFileSync('./app/db.json',JSON.stringify(file));
        res.send(file)
    })

    app.delete('/api/notes/:id', function(req,res){
        const id = req.params.id;
        let file = JSON.parse(fs.readFileSync('./app/db.json','utf-8'));
        file.forEach((el,indx) => {
            if(el.id == id){
                file.splice(indx,1)
            }
        });
        console.log('file content: ', file)
        const result = fs.writeFileSync('./app/db.json',JSON.stringify(file))
        res.send(file)
    })
}




module.exports = router