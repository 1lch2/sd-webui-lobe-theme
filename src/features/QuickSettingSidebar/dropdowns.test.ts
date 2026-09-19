import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { observeDropdowns } from './dropdowns';

describe('quick-settings dropdown positioning', () => {
  let root: HTMLElement;
  let anchor: HTMLElement;
  let list: HTMLElement;
  let rect: DOMRect;
  let cleanup: () => void;
  let resize: ResizeObserverCallback;
  let pending: FrameRequestCallback | undefined;
  const disconnect = vi.fn();

  const flush = () => {
    const callback = pending;
    pending = undefined;
    callback?.(0);
  };
  const property = (name: string) => list.style.getPropertyValue(`--lobe-options-${name}`);

  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1200);
    vi.stubGlobal('innerHeight', 900);
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb: FrameRequestCallback) => {
        pending = cb;
        return 1;
      }),
    );
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn(() => {
        pending = undefined;
      }),
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: ResizeObserverCallback) {
          resize = cb;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = disconnect;
      },
    );
    root = document.createElement('div');
    root.innerHTML =
      '<div class="gradio-dropdown"><div class="wrap"><div class="wrap-inner"></div><ul class="options"><li>model</li></ul></div></div>';
    document.body.append(root);
    anchor = root.querySelector('.wrap')!;
    list = root.querySelector('ul')!;
    rect = { bottom: 300, height: 100, left: 16, top: 200, width: 238 } as DOMRect;
    vi.spyOn(anchor, 'getBoundingClientRect').mockImplementation(() => rect);
    cleanup = observeDropdowns(root);
    flush();
  });

  afterEach(() => {
    cleanup();
    root.remove();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('tracks an open menu through sidebar resizing and tag wrapping', () => {
    expect(property('width')).toBe('238px');
    expect(property('top')).toBe('300px');
    rect = { ...rect, bottom: 268, height: 68, width: 518 } as DOMRect;
    resize([], {} as ResizeObserver);
    resize([], {} as ResizeObserver);
    expect(pending).toBeDefined();
    flush();
    expect(property('width')).toBe('518px');
    expect(property('top')).toBe('268px');
    rect = { ...rect, bottom: 332, height: 132, width: 238 } as DOMRect;
    resize([], {} as ResizeObserver);
    flush();
    expect(property('width')).toBe('238px');
    expect(property('top')).toBe('332px');
  });

  it('tracks nested scrolling and opens upward with limited viewport space', () => {
    rect = { ...rect, bottom: 800, top: 700 } as DOMRect;
    root.dispatchEvent(new Event('scroll'));
    flush();
    expect(property('top')).toBe('auto');
    expect(property('bottom')).toBe('200px');
    expect(property('height')).toBe('692px');
  });

  it('keeps a menu inside the viewport after window resizing', () => {
    rect = { ...rect, left: 1100, width: 400 } as DOMRect;
    window.dispatchEvent(new Event('resize'));
    flush();
    expect(property('left')).toBe('792px');
    expect(property('width')).toBe('400px');
  });

  it('discovers a newly opened menu and hides it when the panel is hidden', async () => {
    list.remove();
    await Promise.resolve();
    list = document.createElement('ul');
    list.className = 'options';
    anchor.append(list);
    await Promise.resolve();
    flush();
    expect(Object.hasOwn(list.dataset, 'lobePositioned')).toBe(true);
    rect = { ...rect, height: 0, width: 0 } as DOMRect;
    resize([], {} as ResizeObserver);
    flush();
    expect(property('visibility')).toBe('hidden');
  });

  it('removes observers, listeners, pending frames and positioning overrides on cleanup', () => {
    cleanup();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(Object.hasOwn(list.dataset, 'lobePositioned')).toBe(false);
    expect(property('width')).toBe('');
    window.dispatchEvent(new Event('resize'));
    root.dispatchEvent(new Event('scroll'));
    expect(pending).toBeUndefined();
    cleanup = () => {};
  });

  it('hides an open menu when a collapsed panel clips its full-width contents', () => {
    cleanup();
    const panel = document.createElement('aside');
    panel.className = 'draggable-panel';
    root.before(panel);
    panel.append(root);
    vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue({ width: 0 } as DOMRect);
    cleanup = observeDropdowns(root);
    flush();
    expect(property('visibility')).toBe('hidden');
    panel.replaceWith(root);
  });
});
