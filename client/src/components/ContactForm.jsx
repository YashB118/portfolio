import { useState } from 'react';
import api from '../lib/api.js';

const INIT = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState(null); // 'sending' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      const res = await api.post('/api/contact', form);
      if (res.data.success) {
        setStatus('success');
        setServerMsg(res.data.message);
        setForm(INIT);
      } else {
        setStatus('error');
        setServerMsg(res.data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        const map = {};
        apiErrors.forEach((e) => { map[e.field] = e.message; });
        setErrors(map);
        setStatus(null);
      } else {
        setServerMsg(err.response?.data?.message || 'Server error. Please try again.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '40px 0' }}>
        <h4 className="section-label">Message Sent</h4>
        <p className="form-success" style={{ fontSize: '14px', letterSpacing: '0.5px', textTransform: 'none' }}>
          {serverMsg}
        </p>
        <button
          className="button mt-30"
          onClick={() => setStatus(null)}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Your full name"
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handle}
          placeholder="your@email.com"
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handle}
          placeholder="What is this about?"
        />
        {errors.subject && <p className="form-error">{errors.subject}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handle}
          placeholder="Tell me about your project or opportunity..."
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="form-error" style={{ marginBottom: '10px', fontSize: '11px' }}>{serverMsg}</p>
      )}

      <button
        type="submit"
        className="button primary"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
