$ws_collection_get = [
    '_id'=> '_design/get',
    'views'=> [
      'type'=> [
        'map'=> 'function(doc) {\nif(doc.status === 'active' && doc.type === 'product' || doc.type === 'service') {\nemit(doc.type,{\n\"tipo\": doc.type,\n\"price\": 150,\n\"stock\": 1,\n\"discount\": 0,\n\"tax\": 150\n });}'
        ],
      'sku'=>[
        'map'=> ''
        ],
      'status'=> [
        'map'=> ''
      ],
      'seach'=>[
        'map'=> ' '
      ],
      'items'=> [
        'map'=> ''
      ],
      'variations'=>[
        'map' => ''
      ]
    ]
  ]
