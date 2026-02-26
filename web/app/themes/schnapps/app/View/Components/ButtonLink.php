<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ButtonLink extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public string $href,
        public string $label,
        public ?string $title = null,
        public string $target = '_self',
        public bool $nofollow = false,
        public ?string $rel = null,
        public string $style = 'primary',
        public ?string $icon = null,
    ) {}

    /**
     * Build the rel attribute.
     */
    public function relAttribute(): ?string
    {
        $parts = [];

        if ($this->target === '_blank') {
            $parts[] = 'noopener';
        }

        if ($this->nofollow) {
            $parts[] = 'nofollow';
        }

        if ($this->rel) {
            $parts[] = $this->rel;
        }

        return ! empty($parts) ? implode(' ', array_unique($parts)) : null;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return $this->view('components.button-link');
    }
}
