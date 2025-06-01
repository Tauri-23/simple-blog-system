<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->string("id", 20)->primary();
            $table->text("caption")->nullable();
            $table->string("photo", 20)->nullable();
            $table->string("user_id", 20)->nullable(); // Foreign
            $table->string("admin_id", 20)->nullable(); // Foreign
            $table->unsignedBigInteger("category_id")->nullable(); // Foreign
            $table->integer("likes_count")->default(0);
            $table->integer("comments_count")->default(0);
            $table->timestamps();

            $table->foreign("user_id")
            ->references("id")
            ->on("users")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("admin_id")
            ->references("id")
            ->on("admins")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("category_id")
            ->references("id")
            ->on("blog_categories")
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
