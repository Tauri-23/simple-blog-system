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
        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();
            $table->string("comment");
            $table->string("blog_id", 20)->nullable(); // Foreign
            $table->string("admin_id", 20)->nullable(); // Foreign
            $table->string("user_id", 20)->nullable(); // Foreign
            $table->timestamps();

            

            /**
             * Foreign
             */
            $table->foreign("blog_id")
            ->references("id")
            ->on("blogs")
            ->nullOnDelete()
            ->cascadeOnUpdate();

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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_comments');
    }
};
