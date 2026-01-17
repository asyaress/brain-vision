@extends('layouts.app')

@section('title', 'Clinical MRI Assistant')

@section('content')
<div class="workspace" aria-label="Clinical chatbot workspace">

  <section class="panel panel--chat" aria-label="Clinical Chat">
    <div class="panel__header">
      <div>
        <h1 class="h1">Clinical MRI Assistant</h1>
        <p class="muted">Chatbot klinis untuk ringkasan temuan, diferensial diagnosis, dan rekomendasi pemeriksaan lanjutan (prototype UI).</p>
      </div>

      <div class="panel__headerActions" aria-label="Chat controls">
        <span class="badge badge--neutral" id="uploadSummary">0/4 uploaded</span>
        <button class="btn btn--quiet" type="button" id="btnClearChat" aria-label="Clear chat">Clear</button>
      </div>
    </div>

    <div class="chat chat--full" id="chat">
      <div class="chat__messages" id="chatMessages" aria-live="polite" aria-relevant="additions">
        <div class="msg msg--system">
          <div class="msg__meta">System</div>
          <div class="msg__bubble">
            Silakan siapkan <strong>Case Setup</strong> di panel kanan (upload MRI + konteks pasien), lalu klik <strong>Diagnosis</strong>.
            Kamu juga bisa langsung bertanya (contoh: “buatkan ringkasan temuan dan kemungkinan diagnosis”).
          </div>
        </div>
      </div>

      <div class="chat__composer" role="form" aria-label="Send a message">
        <label class="sr-only" for="chatInput">Message</label>
        <input class="input" id="chatInput" type="text" placeholder="Ketik pertanyaan klinis…">
        <button class="btn btn--primary" type="button" id="chatSend">Send</button>
      </div>
    </div>
  </section>

  <aside class="panel panel--case" aria-label="Case Setup">
    <div class="panel__header">
      <div>
        <h2 class="h2">Case Setup</h2>
        <p class="muted">Lengkapi konteks dan upload MRI sebelum menjalankan diagnosis.</p>
      </div>
    </div>

    <div class="panel__body">
      <section class="section" aria-label="Patient context">
        <div class="section__title">Patient context (optional)</div>
        <div class="form form--compact">
          <div class="field">
            <label class="label" for="age">Age</label>
            <input class="input" id="age" name="age" inputmode="numeric" placeholder="Enter patient age (optional)">
          </div>

          <div class="field">
            <label class="label" for="gender">Gender</label>
            <select class="input" id="gender" name="gender">
              <option value="">Select (optional)</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </section>

      <section class="section" aria-label="MRI uploads">
        <div class="section__title">MRI uploads</div>

        <form id="uploadForm" class="upload upload--compact" autocomplete="off" novalidate>
          <div class="upload__grid upload__grid--tight">
            <x-dropzone id="t1c" name="t1c" label="T1c" hint=".nii.gz • .npy • .zip • .dcm" />
            <x-dropzone id="t2" name="t2" label="T2" hint=".nii.gz • .npy • .zip • .dcm" />
            <x-dropzone id="t1" name="t1" label="T1" hint=".nii.gz • .npy • .zip • .dcm" />
            <x-dropzone id="flair" name="flair" label="FLAIR" hint=".nii.gz • .npy • .zip • .dcm" />
          </div>
        </form>

        <p class="help">Saran penamaan: <code>T1c_ax</code>, <code>T1_cor</code>, <code>T2_sag</code>, <code>FLAIR_ax</code> (agar pipeline backend mudah memetakan modality & view).</p>
      </section>

      <section class="section" aria-label="Actions">
        <div class="section__title">Actions</div>
        <div class="actions actions--compact">
          <button class="btn btn--primary btn--block" type="button" id="btnFull">Diagnosis (Full modality)</button>
          <button class="btn btn--outline btn--block" type="button" id="btnMissing">Diagnosis (Allow missing)</button>
          <button class="btn btn--quiet btn--block" type="button" id="btnRestart">Reset case</button>
        </div>
      </section>

      <details class="details" aria-label="Usage and safety">
        <summary>Usage & safety notes</summary>
        <div class="details__body">
          <ol class="ol">
            <li>Upload MRI per-modality (T1c/T1/T2/FLAIR).</li>
            <li>Isi age/gender (opsional) untuk konteks.</li>
            <li>Jalankan diagnosis, lalu lanjutkan tanya jawab di chat.</li>
          </ol>
        </div>
      </details>

    </div>
  </aside>

</div>
@endsection
