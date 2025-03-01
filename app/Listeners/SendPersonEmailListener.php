<?php
namespace App\Listeners;

use App\Events\PersonCreated;
use App\Jobs\SendPersonEmail;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendPersonEmailListener implements ShouldQueue
{
    public function handle(PersonCreated $event)
    {
        dispatch(new SendPersonEmail($event->person));
    }
}
