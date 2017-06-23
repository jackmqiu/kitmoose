var express = require("express");
var router = express.Router({mergeParams: true});
var Kit = require("../models/kit");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//CREATE COMMENT ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    // var author = req.body.author;
    // var text = req.body.text;
    // var newComment = {author: author, text: text}
    Kit.findById(req.params.id, function(err, foundKit){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundKit.comments.push(comment);
                    foundKit.save();
                    console.log("comment added");
                    console.log(foundKit.comments[0]);
                    res.redirect("/kits/" + req.params.id);
                }
            })
        }
    })
    
})
//NEW COMMENT ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Kit.findById(req.params.id, function(err, foundKit){
        if(err){
            console.log(err);
        }else{
            res.render("newComment", {kit: foundKit});
        }
    })
    
})

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          res.redirect("back");
        } else {
            Kit.findById(req.params.id, function(err, foundKit) {
                if(err){
                    res.redirect("back");
                }else{
                    console.log(foundComment);
                    console.log(foundKit);
                    res.render("editComment", {kit: foundKit, comment: foundComment});
                }
            })
        }
    })
});


// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/kits/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
        //   req.flash("success", "Comment deleted");
           res.redirect("/kits/" + req.params.id);
       }
    });
});


module.exports = router;