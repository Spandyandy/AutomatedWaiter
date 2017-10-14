<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_item', function (Blueprint $table) {
            $table->increments('id');
            $table->string('userId');
            $table->unsignedInteger('itemId');

            $table->foreign('userId')
                ->references('personId')->on('users');
            $table->foreign('itemId')
                ->references('id')->on('items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_item');
    }
}
