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
    // request로 받아온 정보들
    try{
        const board = new Board({title,userName,contents}); // 새로운 board 만들어서 값 담아줌
        board.save(); // board 저장 -> DB에 저장됌
        res.status(201).json({
            submit:true // response로 submit : true값 전달
        })
    }catch(err){
        console.log(err);
    }
})
router.get('/getList',(req,res)=>{
    Board.find({},{_id:1,title:1,userName:1},(err,boardList)=>{
        if(err) return res.status(500).json({error:err});
        if(!boardList) return res.status(404).json({message : 'boardList not found'})
        // Board의 내용이 없으면 메시지와 함께 404 전달
        res.send(boardList) // Board의 _id, title, userName값 전달해줌
    }) 

})

router.post('/getDetail',(req,res)=>{
    Board.find({_id:req.body},{_id:1,title:1,userName:1,contents:1},(err,boardList)=>{
        // request로 받은 _id값을 db와 비교
        if(err) return res.status(500).json({error:err});
        if(!boardList) return res.status(404).json({message : 'boardList not found'})
        // Board에 _id와 일치하는 값이 없으면 메시지와 함께 404전달
        res.send(boardList) // request의 id값과 일치하는 값의 _id, title, userName, contents 전달
    })
})

router.patch('/update',(req,res)=>{
    Board.findOneAndUpdate({_id:req.body._id}, {$set:{title:req.body.title, contents:req.body.contents}},
        {new:true},(err,boardList)=>{ // request로 받은 _id값과 비교
            if(err) return res.status(500).json({error:err})
            if(!boardList) return res.status(404).json({message: 'boardList not Found'})
            // Board에 _id와 일치하는 값이 없으면 메시지와 함께 404전달
            return res.json({
                updateSuccess:true // request로 보낸 _id값과 게시글들의 _id값과 비교해서 존재할 시
                // title과 contents를 reqest로 보낸 title, contents로 수정 후 updateSuccess : true 전달
            })
        })
})

router.delete('/delete',(req,res)=>{
    Board.findOneAndDelete({_id:req.body._id},(err,boardList)=>{
        if(err) return res.status(500).json({error:err})
        if(!boardList) return res.status(404).json({message:'boardList not found'})
        // Board에 _id와 일치하는 값이 없으면 메시지와 함께 404전달
        return res.json({
            deleteSuccess:true
            // 게시글들의 _id 중 request로 보낸 _id가 일치할 시 해당 _id값의 값을 지워버림
        })
    })
})

router.post('/findTitle',(req,res)=>{
    Board.find({title: {$regex : req.body.data } },{title:1, userName:1},(err,datalist)=>{
        // request로 보낸 title의 값과 게시글들의 title 비교
        if(err) return res.status(500).send({error : err});
        if(!datalist) return res.status(404).send({error : 'List not found'});
        // Board에 request로 보낸 title값이 일치하지 않으면 메시지와 함께 404전달
        res.send(datalist); // 게시글들의 title중 request로 보낸 title존재하면 해당 리스트들 전달
    })
    })

router.post('/findUserName',(req,res)=>{
    Board.find({userName: {$regex : req.body.data } },{title:1, userName:1},(err,datalist)=>{
        // request로 보낸 userName의 값과 게시글들의 userName 비교
        if(err) return res.status(500).send({error : err});
        if(!datalist) return res.status(404).send({error : 'List not found'});
        // Board에 request로 보낸 userName값이 일치하지 않으면 메시지와 함께 404전달
        res.send(datalist); // 게시글들의 userName중 request로 보낸 userName존재하면 해당 리스트들 전달
    })
    })


module.exports = router;