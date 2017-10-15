<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    return [
<<<<<<< HEAD
        'name' => "Leonardo Di Caprio",
        'phonenumber' => $faker->phoneNumber,
        'lastVisited' => $faker->dateTimeThisMonth(),
        'numberOfVisits' => 1
=======

>>>>>>> 2a7218cb15df7efc6830bd5f967ac482f552ee73
    ];
});
