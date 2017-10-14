<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {

    return [
        'name' => 'Mozzarella Wedges',
        'description' => 'Cheese Wedges',
        'image' => 'http://www.theplumtomato.com/wp-content/uploads/2014/05/Fried-Mozzarella-Wedges1.jpg',
        'keywords' => 'cheese wedges',
    ];
});
