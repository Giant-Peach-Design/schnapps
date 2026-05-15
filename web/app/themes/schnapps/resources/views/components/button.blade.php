{{-- Button Component (non-link)
     Mirrors button-link but renders <button type="button">.
     Supports Alpine.js directives via $attributes passthrough.
     Update colour classes below to match your project's palette. --}}
<button
  type="button"
  {{ $attributes->class([
    'group/btn inline-flex items-center rounded-full text-button font-bold leading-[--text-button--line-height] transition-colors pl-8',
    $icon ? 'gap-6 pr-1.5 py-1.5' : 'pr-8 py-[17px]',
    'bg-primary text-white hover:bg-white hover:text-primary' => $style === 'primary',
    'bg-off-black text-white hover:bg-white hover:text-off-black border border-transparent hover:border-off-black' => $style === 'dark',
    'border border-current hover:bg-[var(--theme-text,var(--color-off-black))] hover:text-[var(--theme-bg,var(--color-white))]' => $style === 'ghost',
  ]) }}
>
  <span class="text-trim">{{ $label }}</span>

  @if ($icon)
    <span @class([
      'flex items-center justify-center size-11 rounded-full shrink-0 transition-colors',
      'bg-white text-primary group-hover/btn:bg-primary group-hover/btn:text-white' => $style === 'primary',
      'bg-white text-off-black group-hover/btn:bg-off-black group-hover/btn:text-white' => $style === 'dark',
      'bg-[var(--theme-text,var(--color-off-black))] text-[var(--theme-bg,var(--color-white))] group-hover/btn:bg-[var(--theme-bg,var(--color-white))] group-hover/btn:text-[var(--theme-text,var(--color-off-black))]' => $style === 'ghost',
    ])>
      <x-icon :name="$icon" class="h-4" />
    </span>
  @endif
</button>
