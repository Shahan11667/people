<?php
namespace App\Mail;

use App\Models\Person;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PersonWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $person;

    public function __construct(Person $person)
    {
        $this->person = $person;
    }

    public function build()
    {
        return $this->subject('Welcome to Our System!')
                    ->view('emails.person_welcome', ['person' => $this->person]);
    }
}
