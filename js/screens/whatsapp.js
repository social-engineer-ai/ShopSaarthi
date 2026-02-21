// WhatsApp Notification Gallery

function renderWhatsApp() {
  const recipients = ['nephew', 'father', 'owner', 'customer'];
  const activeRecipient = AppState.waRecipient || 'nephew';

  const tabs = recipients.map(r => ({
    id: r,
    label: r === 'nephew' ? 'Nephew' : r === 'father' ? 'Papa' : r === 'owner' ? 'Owner' : 'Customer',
    count: AppData.whatsappTemplates.filter(t => t.recipient === r).length
  }));

  const templates = AppData.whatsappTemplates.filter(t => t.recipient === activeRecipient);

  return `
    ${HeaderBar('💬 WhatsApp Messages', { subtitle: 'Message Templates Gallery', backRoute: AppState.role === 'nephew' ? 'more' : '' })}
    ${TabBar(tabs, activeRecipient, 'setWaRecipient')}

    <div style="padding:16px; background: #e5ddd5; min-height:400px;">
      ${templates.map(t => `
        <div style="margin-bottom:20px;">
          <div style="text-align:center; margin-bottom:8px;">
            <span class="badge badge-gray">${t.trigger}</span>
          </div>
          ${WhatsAppBubble(t.sample, { type: 'received', time: '11:30 AM' })}
          ${t.recipient === 'nephew' ? `
            <div class="wa-actions" style="max-width:85%; margin-top:4px;">
              ${t.sample.includes('Confirm') || t.sample.includes('Sahi') ? `
                <button class="wa-action-btn" style="font-size:11px;">✅ Confirm</button>
                <button class="wa-action-btn" style="font-size:11px;">✏️ Edit</button>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `).join('')}

      ${templates.length === 0 ? EmptyState('No templates for this recipient', { icon: '💬' }) : ''}
    </div>
    <div style="height:80px;"></div>
  `;
}

function setWaRecipient(recipientId) {
  AppState.waRecipient = recipientId;
  handleRoute();
}
