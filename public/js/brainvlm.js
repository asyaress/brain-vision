(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const statusEl = $('#appStatus');
  const uploadSummaryEl = $('#uploadSummary');
  const chatMessages = $('#chatMessages');
  const chatInput = $('#chatInput');

  function setStatus(text, tone = 'neutral') {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.className = `badge badge--${tone}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function appendMessage(role, text, metaLabel) {
    if (!chatMessages) return;
    const wrapper = document.createElement('div');
    wrapper.className = `msg msg--${role}`;

    const meta = document.createElement('div');
    meta.className = 'msg__meta';
    meta.textContent = metaLabel || (role === 'user' ? 'Clinician' : role === 'assistant' ? 'BrainVLM' : 'System');

    const bubble = document.createElement('div');
    bubble.className = 'msg__bubble';
    bubble.innerHTML = text;

    wrapper.appendChild(meta);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendResultCard(title, items) {
    const list = items.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    appendMessage(
      'assistant',
      `
        <div class="result">
          <div class="result__title">${escapeHtml(title)}</div>
          <ul class="result__list">${list}</ul>
          <div class="result__footer">UI prototype: ganti konten ini dengan output model sebenarnya.</div>
        </div>
      `
    );
  }

  function getUploadedCount() {
    const inputs = $$('.dropzone__input');
    return inputs.filter(i => i.files && i.files.length > 0).length;
  }

  function updateUploadSummary() {
    if (!uploadSummaryEl) return;
    const count = getUploadedCount();
    uploadSummaryEl.textContent = `${count}/4 uploaded`;
  }

  // Dropzones
  function wireDropzones() {
    const zones = $$('[data-dropzone]');
    zones.forEach(zone => {
      const input = $('.dropzone__input', zone);
      const body = $('.dropzone__body', zone);
      const filename = $('[data-dropzone-filename]', zone);

      if (!input || !body || !filename) return;

      const setFilename = () => {
        if (input.files && input.files.length > 0) {
          const f = input.files[0];
          filename.textContent = `${f.name} (${Math.round(f.size / 1024)} KB)`;
          zone.classList.add('dropzone--hasfile');
        } else {
          filename.textContent = 'Belum ada file';
          zone.classList.remove('dropzone--hasfile');
        }
        updateUploadSummary();
      };

      body.addEventListener('click', () => input.click());
      body.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          input.click();
        }
      });

      input.addEventListener('change', setFilename);

      body.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dropzone--drag');
      });
      body.addEventListener('dragleave', () => zone.classList.remove('dropzone--drag'));
      body.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dropzone--drag');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          setFilename();
        }
      });

      setFilename();
    });
  }

  // Chat
  function wireChat() {
    const sendBtn = $('#chatSend');
    const clearBtn = $('#btnClearChat');

    const send = () => {
      const val = (chatInput?.value || '').trim();
      if (!val) return;
      appendMessage('user', escapeHtml(val));
      chatInput.value = '';
      setStatus('Thinking…', 'neutral');

      // Dummy assistant response
      window.setTimeout(() => {
        const count = getUploadedCount();
        const hint = count === 0
          ? 'Tip: upload MRI dulu supaya diagnosis bisa dijalankan.'
          : `Saya mendeteksi ${count} modality terunggah. Kamu bisa klik tombol Diagnosis untuk output ringkasan.`;

        appendMessage('assistant', escapeHtml(hint));
        setStatus('Ready', 'neutral');
      }, 450);
    };

    sendBtn?.addEventListener('click', send);
    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') send();
    });

    clearBtn?.addEventListener('click', () => {
      if (!chatMessages) return;
      chatMessages.innerHTML = `
        <div class="msg msg--system">
          <div class="msg__meta">System</div>
          <div class="msg__bubble">Chat cleared. Upload MRI lalu klik Diagnosis.</div>
        </div>
      `;
      setStatus('Ready', 'neutral');
    });
  }

  // Actions
  function wireActions() {
    const btnFull = $('#btnFull');
    const btnMissing = $('#btnMissing');
    const btnRestart = $('#btnRestart');

    const ageEl = $('#age');
    const genderEl = $('#gender');

    const validateAccept = () => {
      const bad = [];
      $$('.dropzone__input').forEach(input => {
        if (!input.files || input.files.length === 0) return;
        const f = input.files[0];
        const ok = /(\.nii(\.gz)?|\.npy|\.zip|\.dcm)$/i.test(f.name);
        if (!ok) bad.push(f.name);
      });
      return bad;
    };

    btnFull?.addEventListener('click', () => {
      const count = getUploadedCount();
      const bad = validateAccept();
      if (bad.length) {
        setStatus('Invalid file type', 'danger');
        appendMessage('system', `File type tidak didukung: <strong>${escapeHtml(bad.join(', '))}</strong>.`, 'Validation');
        return;
      }
      if (count < 4) {
        setStatus('Missing modality', 'warning');
        appendMessage('system', `Butuh <strong>4/4</strong> modality untuk Full Diagnosis. Saat ini: <strong>${count}/4</strong>.`, 'Validation');
        return;
      }

      const age = (ageEl?.value || '').trim();
      const gender = (genderEl?.value || '').trim();

      setStatus('Running (dummy)…', 'neutral');
      appendMessage('user', 'Run: Full modality Diagnosis');

      window.setTimeout(() => {
        appendResultCard('Full Modality Result (Dummy)', [
          `Context: age=${age || 'N/A'}, gender=${gender || 'N/A'}`,
          'Finding: enhancing lesion with surrounding edema (placeholder)',
          'Suggestion: correlate with clinical presentation; consider advanced sequences (placeholder)',
          'Next step: connect endpoint POST /diagnose untuk output real model'
        ]);
        setStatus('Ready', 'success');
        window.setTimeout(() => setStatus('Ready', 'neutral'), 1200);
      }, 650);
    });

    btnMissing?.addEventListener('click', () => {
      const count = getUploadedCount();
      const bad = validateAccept();
      if (bad.length) {
        setStatus('Invalid file type', 'danger');
        appendMessage('system', `File type tidak didukung: <strong>${escapeHtml(bad.join(', '))}</strong>.`, 'Validation');
        return;
      }
      if (count === 0) {
        setStatus('No uploads', 'warning');
        appendMessage('system', 'Upload minimal 1 modality untuk Missing Modality Diagnosis.', 'Validation');
        return;
      }

      const age = (ageEl?.value || '').trim();
      const gender = (genderEl?.value || '').trim();

      setStatus('Running (dummy)…', 'neutral');
      appendMessage('user', 'Run: Missing Modality Diagnosis');

      window.setTimeout(() => {
        appendResultCard('Missing Modality Result (Dummy)', [
          `Uploaded modalities: ${count}/4`,
          `Context: age=${age || 'N/A'}, gender=${gender || 'N/A'}`,
          'Confidence: lower (placeholder)',
          'Tip: upload modality lain jika tersedia untuk meningkatkan akurasi'
        ]);
        setStatus('Ready', 'success');
        window.setTimeout(() => setStatus('Ready', 'neutral'), 1200);
      }, 650);
    });

    btnRestart?.addEventListener('click', () => {
      setStatus('Resetting…', 'neutral');

      // Clear form inputs
      $$('.dropzone__input').forEach(i => { i.value = ''; });
      wireDropzones(); // re-sync UI state

      if (ageEl) ageEl.value = '';
      if (genderEl) genderEl.value = '';

      // Clear chat
      $('#btnClearChat')?.click();

      updateUploadSummary();
      setStatus('Ready', 'neutral');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireDropzones();
    wireChat();
    wireActions();
    updateUploadSummary();
    setStatus('Ready', 'neutral');
  });
})();
