/** Keep Gradio's fixed dropdowns anchored when the sidebar or selected tags resize. */
export const observeDropdowns = (root: HTMLElement) => {
  const lists = new Map<HTMLElement, HTMLElement>();
  const panel = root.closest<HTMLElement>('.draggable-panel');
  let frame = 0;

  const update = () => {
    frame = 0;
    const panelVisible = !panel || panel.getBoundingClientRect().width > 0;
    for (const [list, anchor] of lists) {
      const rect = anchor.getBoundingClientRect();
      const padding = 8;
      const below = Math.max(0, window.innerHeight - rect.bottom - padding);
      const above = Math.max(0, rect.top - padding);
      const downward = below >= above;
      const width = Math.max(0, Math.min(rect.width, window.innerWidth - padding * 2));
      const left = Math.max(padding, Math.min(rect.left, window.innerWidth - width - padding));

      // Custom properties survive Gradio updating its own inline top/bottom/width.
      const values = {
        bottom: downward ? 'auto' : `${window.innerHeight - rect.top}px`,
        height: `${downward ? below : above}px`,
        left: `${left}px`,
        top: downward ? `${rect.bottom}px` : 'auto',
        visibility: panelVisible && rect.width && rect.height ? 'visible' : 'hidden',
        width: `${width}px`,
      };
      for (const [key, value] of Object.entries(values)) {
        list.style.setProperty(`--lobe-options-${key}`, value);
      }
      list.dataset.lobePositioned = '';
    }
  };

  const schedule = () => {
    if (lists.size && !frame) frame = requestAnimationFrame(update);
  };
  const resize = new ResizeObserver(schedule);
  resize.observe(root);
  // Collapsing DraggablePanel clips a still-full-width inner container.
  if (panel) resize.observe(panel);

  const refresh = () => {
    for (const [list, anchor] of lists) {
      if (!root.contains(list)) {
        resize.unobserve(anchor);
        lists.delete(list);
      }
    }
    root.querySelectorAll<HTMLElement>('.gradio-dropdown .wrap > ul.options').forEach((list) => {
      if (lists.has(list)) return;
      const anchor = list.parentElement!;
      lists.set(list, anchor);
      resize.observe(anchor);
    });
    schedule();
  };
  const mutations = new MutationObserver(refresh);
  mutations.observe(root, { childList: true, subtree: true });
  // Capture scroll events from the sidebar's scrolling body as well as the page.
  const onScroll = (event: Event) => {
    if (!lists.has(event.target as HTMLElement)) schedule();
  };
  window.addEventListener('scroll', onScroll, true);
  window.addEventListener('resize', schedule);
  refresh();

  return () => {
    cancelAnimationFrame(frame);
    mutations.disconnect();
    resize.disconnect();
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', schedule);
    for (const list of lists.keys()) {
      delete list.dataset.lobePositioned;
      for (const key of ['bottom', 'height', 'left', 'top', 'visibility', 'width']) {
        list.style.removeProperty(`--lobe-options-${key}`);
      }
    }
  };
};
