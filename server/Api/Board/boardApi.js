const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
router.use(cors())
router.use(bodyParser.json())
const {Board} = require('../../models/Board');


router.post('/add', (req,res)=>{

    const title = req.body.title;
    const userName = req.body.userName;
    const contents = req.body.contents
    
    try{
        const board = new Board({title,userName,contents});
        board.save();
        res.status(201).json({
            submit:true
        })
    }catch(err){
        console.log(err);
    }
})
router.get('/getList',(req,res)=>{
    Board.find({},{_id:1,title:1,userName:1},(err,boardList)=>{
        if(err) return res.status(500).json({error:err});
        if(!boardList) return res.status(404).json({message : 'boardList not found'})

        res.send(boardList)
    })

})

router.post('/getDetail',(req,res)=>{
    // console.log('detail',req.body)
    Board.find({_id:req.body},{_id:1,title:1,userName:1,contents:1},(err,boardList)=>{
        if(err) return res.status(500).json({error:err});
        if(!boardList) return res.status(404).json({message : 'boardList not found'})
        // console.log('boardList:',boardList)
        res.send(boardList)
    })
})

router.patch('/update',(req,res)=>{
    console.log(req.body)
    Board.findOneAndUpdate({_id:req.body._id}, {$set:{title:req.body.title, contents:req.body.contents}},
        {new:true},(err,boardList)=>{
            if(err) return res.status(500).json({error:err})
            if(!boardList) return res.status(404).json({message: 'boardList not Found'})

            return res.json({
                updateSuccess:true
            })
        })
})

router.delete('/delete',(req,res)=>{
    console.log('deleteApi',req.body)
    Board.findOneAndDelete({_id:req.body._id},(err,boardList)=>{
        if(err) return res.status(500).json({error:err})
        if(!boardList) return res.status(404).json({message:'boardList not found'})

        return res.json({
            deleteSuccess:true
        })
    })
})

module.exports = router;
