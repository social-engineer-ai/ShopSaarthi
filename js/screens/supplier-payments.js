// Module 6: Supplier Payments

function renderSupplierPayments() {
  const pending = AppData.supplierPayments.filter(t => ['scheduled', 'reminded'].includes(t.status));
  const overdue = AppData.supplierPayments.filter(t => t.status === 'overdue');
  const paid = AppData.supplierPayments.filter(t => t.status === 'paid');
  const beforeDispatch = AppData.supplierPayments.filter(t => t.payment_timing === 'before_dispatch' && t.status !== 'paid');

  const tabs = [
    { id: 'pending', label: 'बाकी', count: pending.length },
    { id: 'paid', label: 'भुगतान हुआ', count: paid.length }
  ];

  const tasks = AppState.supplierPaymentTab === 'paid' ? paid : pending;
  const totalPending = pending.reduce((s, t) => s + t.amount_pending, 0);

  return `
    ${HeaderBar('💸 Supplier Payments', { subtitle: `Pending: ${formatCurrency(totalPending)}`, backRoute: AppState.role === 'nephew' ? 'more' : '' })}

    ${beforeDispatch.length > 0 ? beforeDispatch.map(sp => {
      const sup = getSupplier(sp.supplier_id);
      return `<div class="dispatch-banner">
        ⚠️ ${sup?.name || 'Supplier'} — ${formatCurrency(sp.amount_pending)} dispatch से पहले pay करो!
      </div>`;
    }).join('') : ''}

    ${TabBar(tabs, AppState.supplierPaymentTab, 'setSupplierPaymentTab')}

    ${tasks.map(sp => {
      const supplier = getSupplier(sp.supplier_id);
      const isUrgent = sp.payment_timing === 'before_dispatch' && sp.status !== 'paid';
      return Card(`
        <div class="collection-header">
          <div>
            <strong>${supplier?.name || 'Supplier'}</strong>
            <div style="font-size:12px; color:var(--gray-500);">Order: ${sp.order_id} | ${sp.payment_timing}</div>
          </div>
          <div style="text-align:right;">
            ${AmountDisplay(sp.amount_pending, { size: 'large', color: isUrgent ? 'red' : '' })}
          </div>
        </div>
        <div style="font-size:13px; color:var(--gray-500); margin-bottom:8px;">
          📅 Due: ${sp.payment_due_date} | Via: ${sp.payment_method}
        </div>
        ${sp.notes ? `<div style="font-size:12px; color:var(--gray-600); margin-bottom:8px;">📝 ${sp.notes}</div>` : ''}
        <div class="collection-actions">
          ${sp.status !== 'paid' ? ActionButton('💳 Pay Now', `paySupplier('${sp.supplier_payment_id}')`, { type: 'success', small: true }) : ''}
          ${ActionButton('Nephew भेजो', `showToast('📱 Payment details Nephew को भेजा')`, { type: 'secondary', small: true })}
          ${supplier ? CallButton(supplier.phone, supplier.name, { small: true }) : ''}
        </div>
      `, { className: isUrgent ? 'card-urgent' : '' });
    }).join('')}
    ${tasks.length === 0 ? EmptyState('कोई payment नहीं', { icon: '✅' }) : ''}

    <!-- Cash Flow Summary -->
    ${SectionTitle('📊 Cash Flow Summary')}
    ${Card(`
      <table class="cash-table">
        <tr><td>Customer collections pending</td><td class="text-green">${formatCurrency(AppData.collectionTasks.filter(t => t.status !== 'collected').reduce((s, t) => s + t.amount_pending, 0))}</td></tr>
        <tr><td>Supplier payments pending</td><td class="text-red">${formatCurrency(totalPending)}</td></tr>
        <tr class="total"><td>Net position</td><td>${formatCurrency(
          AppData.collectionTasks.filter(t => t.status !== 'collected').reduce((s, t) => s + t.amount_pending, 0) - totalPending
        )}</td></tr>
      </table>
    `)}
    <div style="height:80px;"></div>
  `;
}

function setSupplierPaymentTab(tabId) {
  AppState.supplierPaymentTab = tabId;
  handleRoute();
}

function paySupplier(paymentId) {
  event.stopPropagation();
  showModal('Supplier Payment', `
    <p style="margin-bottom:12px;">Payment details:</p>
    ${FormTextInput('Reference Number', 'pay-ref', { placeholder: 'UPI/Bank reference' })}
    <div class="modal-actions">
      ${ActionButton('✅ Payment Done', `
        const sp = AppData.supplierPayments.find(t => t.supplier_payment_id === '${paymentId}');
        if (sp) { sp.status = 'paid'; sp.amount_paid = sp.amount_total; sp.amount_pending = 0; }
        closeModal();
        showToast('✅ Payment recorded');
        handleRoute();
      `, { type: 'success' })}
    </div>
  `);
}
