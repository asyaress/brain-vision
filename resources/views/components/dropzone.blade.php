@props([
  'id',
  'name',
  'label' => 'MRI file',
  'hint' => 'Supported: .nii.gz, .npy, .zip (DICOM slices)',
  'accept' => '.nii,.nii.gz,.npy,.zip,.dcm',
])

<div class="dropzone" data-dropzone>
  <div class="dropzone__header">
    <span class="dropzone__label">{{ $label }}</span>
    <span class="badge badge--small badge--neutral">Upload</span>
  </div>

  <div class="dropzone__body" role="button" tabindex="0" aria-describedby="{{ $id }}_hint">
    <input
      class="dropzone__input"
      type="file"
      id="{{ $id }}"
      name="{{ $name }}"
      accept="{{ $accept }}"
    >

    <div class="dropzone__icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M8.5 11.5L12 8l3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 16.5a4.5 4.5 0 0 0-3.7-4.4A6 6 0 0 0 4 13.5a3.5 3.5 0 0 0 3.5 3.5H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M16 17H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="dropzone__text">
      <div class="dropzone__title">Drop file di sini</div>
      <div class="dropzone__sub">atau klik untuk memilih file</div>
      <div class="dropzone__filename" data-dropzone-filename>Belum ada file</div>
    </div>
  </div>

  <p class="dropzone__hint" id="{{ $id }}_hint">{{ $hint }}</p>
</div>
