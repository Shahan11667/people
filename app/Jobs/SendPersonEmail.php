<?php
namespace App\Jobs;

use App\Mail\PersonWelcomeMail;
use App\Models\Person;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPersonEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $person;

    public function __construct(Person $person)
    {
        $this->person = $person;
    }

    public function handle()
    {
        Mail::to($this->person->email)->send(new PersonWelcomeMail($this->person));
    }
}
