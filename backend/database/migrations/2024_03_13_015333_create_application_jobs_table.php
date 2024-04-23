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
        Schema::create('application_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('salary');
            $table->json('welfare')->nullable();
            $table->float('experience')->nullable();
            $table->json('interview');
            $table->enum('type', ['in office', 'remote', 'hybrid']);
            $table->enum('contract', ['parttime', 'fulltime', 'freelance']);
            $table->json('work');
            $table->json('skill');
            $table->enum('level', ['intern', 'fresher', 'junior', 'middle', 'senior', 'leader', 'manager']);
            $table->enum('status', ['opening', 'closed']);
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('city_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_jobs');
    }
};
