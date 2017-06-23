var mongoose = require("mongoose");
var Kit = require("./models/kit");
var Comment = require("./models/comment");

var data = [
    {
        kitName: "Front of the Line Starter Kit",
        links: ['https://www.amazon.com/JuvaLips-JL01-Juvalips-Lip-plumper/dp/B01MUFJ1AZ/ref=sr_1_12_s_it?s=beauty&ie=UTF8&qid=1496706024&sr=1-12&keywords=lip+plumper&refinements=p_72%3A1248873011',
        'https://www.amazon.com/E-l-f-Moisturizing-Lipstick-Ravishing-Ounce/dp/B00GW58YC8/ref=sr_1_4_s_it?s=beauty&ie=UTF8&qid=1496710741&sr=1-4&keywords=lipstick&th=1',
        'https://www.amazon.com/ZriEy-Sandals-High-heeled-Platform-Wedding/dp/B017R37CF8/ref=sr_1_38?s=apparel&ie=UTF8&qid=1496710961&sr=1-38&nodeID=679337011&psd=1&keywords=stiletto+heels',
        'https://www.amazon.com/Carprinass-Womens-Sleeveless-Bodycon-Bandage/dp/B01MXXMWQH/ref=sr_1_17?s=apparel&ie=UTF8&qid=1496712220&sr=1-17&nodeID=1045024&psd=1&keywords=club+dress'
        ],
        
        productNames: [
            'JuvaLips JL01 Juvalips Lip plumper',
            'E l f Moisturizing Lipstick Ravishing Ounce',
            'ZriEy Sandals High heeled Platform Wedding',
            'Carprinass Womens Sleeveless Bodycon Dress'
        ],
        
        images: ['https://images-na.ssl-images-amazon.com/images/I/619DHD8SKLL._SX522_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/31VobMBuK9L.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/61xS1jdG-XL._UY695_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/61B2y5420gL._UX679_.jpg'
        ],
        description: "Find your man fast with these night-time essentials",
        user: "QueenShanice99",
        comments: []
    },
    {
        kitName: "Cancun Kit",
        links: ['https://www.amazon.com/Compact-First-Aid-Medical-Kit/dp/B01M66U84C/ref=sr_1_1?ie=UTF8&qid=1496712328&sr=8-1-spons&keywords=first+aid+kit&psc=1',
        'https://www.amazon.com/Tylenol-Strength-Reducer-Caplets-24caps/dp/B00BK6OH8O/ref=sr_1_1?s=hpc&ie=UTF8&qid=1496712536&sr=1-1-spons&keywords=tylenol&psc=1',
        'https://www.amazon.com/Trojan-Ultra-Latex-Condoms-count/dp/B0073RBUZ2/ref=sr_1_3_s_it?s=hpc&ie=UTF8&qid=1496712639&sr=1-3&keywords=condoms&th=1',
        'https://www.amazon.com/zeroUV-Finish-Reflective-Mirror-Sunglasses/dp/B01IJ6GSZM/ref=sr_1_4?ie=UTF8&qid=1496712687&sr=8-4&keywords=sunglasses+for+men'
        ],
        productNames: ['Compact First Aid Medical Kit - 121 Piece - Hard Carry Case ',
        'Tylenol Strength Reducer Caplets 24caps',
        'Trojan Ultra Latex',
        'zeroUV Finish Reflective Mirror Sunglasses'
        ],
        
        images: ['https://images-na.ssl-images-amazon.com/images/I/91zUyXt0s0L._SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/61rJysnTq7L._SX522_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/51MUQD56JbL.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71i%2BmdfOEgL._UX679_.jpg'
        ],
        description: "Protect yourself from diseases, hangovers, and sunlight",
        
        user: "troyBoy007",
        comments: []
    }
    ];
    
    

function seedDB(){
    //remove campgrounds
    Kit.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed ALL kits");
            data.forEach(function(seed){
                Kit.create(seed, function(err, kit){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(kit);
                        
                        // Comment.create({
                        //     text: "wish dress wuz sluttier",
                        //     author: "shea889"
                        // }, function(err, comment){
                        //     if(err){
                        //         console.log(err);
                        //     }else{
                        //         kit.comments.push(comment);
                        //         kit.save();
                        //         console.log("comment added");
                        //         console.log(kit.comments[0]);
                        //     }
                        // })
                    }
                })
            })
        }
    });
    
    
    
}
module.exports = seedDB;