var express = require("express");
var router = express.Router({mergeParams: true});
var Kit = require("../models/kit");
var middleware = require("../middleware");

//========//
//=ROUTES=//
//========//

//INDEX
router.get('/', function(req, res) {
    Kit.find({}, function(err, allKits){
        if(err){
            console.log(err);
        } else {
            res.render('index', {kits: allKits});
        }
    });
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to kits array
    var kitName = req.body.kitName;
    var links = [req.body.link1, req.body.link2, req.body.link3, req.body.link4];
    
    //var images = [req.body.image1, req.body.image2, req.body.image3, req.body.image4 ];
    var productNames = [req.body.productName1, req.body.productName2, req.body.productName3, req.body.productName4];
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newKit = {kitName: kitName, productNames: productNames, images: [req.body.image1, req.body.image2, req.body.image3, req.body.image4 ], description: description, links: links, author: author};
    
    // Create a new kit and save to DB
    Kit.create(newKit, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/kits");
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("new.ejs"); 
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
    Kit.findById(req.params.id).populate("comments").exec(function(err, foundKit){
        if(err){
            console.log(err);
        } else {
            console.log(req.params.id);
            res.render('details', {kit: foundKit});
        }
    })
})


// EDIT ROUTE
router.get('/:id/edit', middleware.checkKitOwnership, function(req, res) {
    
    Kit.findById(req.params.id, function(err, foundKit){
        if(err){
            res.redirect('/kits');
        }else{
            res.render('edit', {kit: foundKit});
        }
    })
    
})

// UPDATE ROUTE

router.put('/:id/edit', middleware.checkKitOwnership, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body)
    // get data from form and add to kits array
    var kitName = req.body.kitName;
    var links = [req.body.link1, req.body.link2, req.body.link3, req.body.link4];
    
    //var images = [req.body.image1, req.body.image2, req.body.image3, req.body.image4 ];
    var productNames = [req.body.productName1, req.body.productName2, req.body.productName3, req.body.productName4];
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newKit = {kitName: kitName, productNames: productNames, images: [req.body.image1, req.body.image2, req.body.image3, req.body.image4 ], description: description, links: links, author: author};
    
    Kit.findByIdAndUpdate(req.params.id, newKit, function(err, updatedKit){
        if(err){
            res.redirect('/kits');
        }else{
            res.redirect('/kits/' + req.params.id);
        }
    });
})
//DELETE ROUTE
router.delete("/:id", middleware.checkKitOwnership, function(req, res){
   //destroy kit
   Kit.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/kits");
       } else {
           res.redirect("/kits");
       }
   })
   //redirect somewhere
});

// function checkKitOwnership(req, res, next) {
//  if(req.isAuthenticated()){
//         Kit.findById(req.params.id, function(err, foundKit){
//           if(err){
//               res.redirect("back");
//           }  else {
//               // does user own the campground?
//             if(foundKit.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 res.redirect("back");
//             }
//           }
//         });
//      } else {
//          res.redirect("back");
//      }
// }



// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }



module.exports = router;