
function(doc) {
    if (doc.status === 'active' || doc.type === 'product') {
        var attribute_combinations = new Array();
        for (var i = 0, length = doc.variations.length; i < length; i++) {
            var price_list = doc.variations[0].price_list;
            var stock_list = doc.variations[0].stock_list;
            var pictures_min = doc.variations[0].pictures[0].min;
            var pictures_max = doc.variations[0].pictures[0].max;
            var sku = doc.variations[0].sku.value_name;
            var variant_id = doc.variations[0].id;
            // var attribute_combinations = doc.variations[i].attribute_combinations;           
            // attribute_combination.push(doc.variations[i].attribute_combinations);           
            //  attribute_combinations_array.push(attribute_combination);     
            //  var attribute_combinations = attribute_combination;    
            //  var row;  // while(row = getRow()) { 
            //  attribute_combinations.push(doc.variations[0].attribute_combinations);
            var attribute_combinations = doc.variations[0].attribute_combinations
            emit([doc.name], {
                "_id": doc._id,
                "_rev": doc._rev,
                "variant_id": variant_id,
                "tipo": doc.type,
                "name": doc.name,
                "tags": doc.tags,
                "currency": doc.currency.value,
                "available_quantity": doc.available_quantity,
                "sold_quantity": doc.sold_quantity,
                "cost_price": doc.cost_price,
                "limit_discount": doc.limit_discount,
                "price": doc.variations[0].price_list[0].value,
                "price_list": price_list,
                "stock_list": stock_list,
                "sku": sku,
                "picture_min": pictures_min,
                "picture_max": pictures_max,
                "attribute_combinations": attribute_combinations,
                "pictures_all": pictures_all,
                "price_list": doc.variations[0].price_list,
                "picture_min": doc.variations[0].pictures.min,
                "picture_max": doc.variations[0].pictures.max,
                "category_list": category_array,
                "variations": doc.variations,
            });
        }
        if (doc.type === 'price_list') {
            emit(doc.price_list);
            emit(doc.type, [doc.price_list, 0]);
        }
    }
}
