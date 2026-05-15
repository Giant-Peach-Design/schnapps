<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Button extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public string $label,
        public string $style = 'primary',
        public ?string $icon = null,
    ) {}

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return $this->view('components.button');
    }
}
