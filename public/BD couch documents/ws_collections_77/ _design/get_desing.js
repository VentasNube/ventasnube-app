

function(doc) {
    if(doc.status === 'active' || doc.type === 'product'){
            var attribute_combinations = new Array();
              for(var i=0, length=doc.variations.length; i<length; i++){
                  var price_list = doc.variations[0].price_list;
                  var stock_list =  doc.variations[0].stock_list;
                  var pictures_min = doc.variations[0].pictures[0].min;
                  var pictures_max = doc.variations[0].pictures[0].max;
                  var sku = doc.variations[0].sku.value_name;
                  var variant_id = doc.variations[0].id;
                  var attribute_combinations = doc.variations[0].attribute_combinations
               }
             emit([doc.name],{
                    '_id': doc._id,
                    '_rev':doc._rev,
                    'variant_id':variant_id,
                    'tipo': doc.type,
                    'name': doc.name,
                    'tags': doc.tags,
                    'currency': doc.currency.value,
                    'available_quantity': doc.available_quantity,
                    'sold_quantity': doc.sold_quantity,
                    'cost_price': doc.cost_price,
                    'limit_discount': doc.limit_discount,
                    'price':doc.variations[0].price_list[0].value,
                    'price_list':price_list,
                    'stock_list':stock_list,
                    'sku': sku,
                    'picture_min':pictures_min,
                    'picture_max':pictures_max,
                    'attribute_combinations':attribute_combinations,
                    //'category_list':category_array,
                    //'variations':doc.variations,
              });
    }
}




function(doc) {\n    if(doc.status === 'active' || doc.type === 'product'){\n            var attribute_combinations = new Array();\n              for(var i=0, length=doc.variations.length; i<length; i++){\n                  var price_list = doc.variations[0].price_list;\n                  var stock_list =  doc.variations[0].stock_list;\n                  var pictures_min = doc.variations[0].pictures[0].min;\n                  var pictures_max = doc.variations[0].pictures[0].max;\n                  var sku = doc.variations[0].sku.value_name;\n                  var variant_id = doc.variations[0].id;\n                  var attribute_combinations = doc.variations[0].attribute_combinations\n               }\n             emit([doc.name],{\n                    \_id\': doc._id,\n                    \'_rev\':doc._rev,\n                    \'variant_id\':variant_id,\n                    \'tipo\': doc.type,\n                    \'name\': doc.name,\n                    \'tags\': doc.tags,\n                    \'currency\': doc.currency.value,\n                    \'available_quantity\': doc.available_quantity,\n                    \'sold_quantity\': doc.sold_quantity,\n                    \'cost_price\': doc.cost_price,\n                    \'limit_discount\': doc.limit_discount,\n                    \'price\':doc.variations[0].price_list[0].value,\n                    \'price_list\':price_list,\n                    \'stock_list\':stock_list,\n                    \'sku\': sku,\n                    \'picture_min\':pictures_min,\n                    \'picture_max\':pictures_max,\n                    \'attribute_combinations\':attribute_combinations\n                    // \'pictures_all\':pictures_all,\n                    //\'price_list\':doc.variations[0].price_list,\n                    //\'picture_min\':doc.variations[0].pictures.min,\n                    //\'picture_max\':doc.variations[0].pictures.max\n                     //\'category_list\':category_array,\n                     //\'variations\':doc.variations,\n              });\n    }\n}\n\n'
        