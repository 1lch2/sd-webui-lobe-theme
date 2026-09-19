import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }, { headerHeight = 64 }: { headerHeight?: number }) => ({
    container: css`
      height: calc(100vh - ${headerHeight}px);

      #quicksettings {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;

        width: 100%;

        > * {
          flex: 1;

          width: 100% !important;
          min-width: unset !important;
          max-width: unset !important;
          margin: 0;
          padding: 0;
        }

        .head > label {
          min-width: unset;
          max-width: 60%;
          margin-right: 12px;
        }

        input[type='color'] {
          width: 100%;
        }

        input[type='number'],
        textarea {
          resize: none;
          box-sizing: border-box;
          height: 28px !important;
          padding: 4px !important;
        }

        textarea {
          width: 100%;
        }

        span[data-testid='block-info'] {
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          min-width: 16px;
          min-height: 16px;
        }

        div.gradio-dropdown {
          min-width: unset !important;

          /* Neo's single model selector also uses a viewport-sized input. */
          &:not(.multiselect) {
            .secondary-wrap {
              min-width: 0;
            }

            input {
              width: 100%;
              min-width: 0;
              padding-right: 28px;
            }
          }

          ul.options {
            min-width: 0;
            max-width: none;

            &[data-lobe-positioned] {
              top: var(--lobe-options-top) !important;
              bottom: var(--lobe-options-bottom) !important;
              left: var(--lobe-options-left);

              width: var(--lobe-options-width) !important;
              max-height: var(--lobe-options-height) !important;

              visibility: var(--lobe-options-visibility);
            }
          }

          ul.options > li {
            overflow: hidden !important;

            width: 100% !important;
            max-width: 100%;
            border-radius: ${token.borderRadiusSM}px !important;

            line-height: 1.5 !important;
          }

          .inner-item {
            /* Gradio reads data-index from the clicked option, not its children. */
            pointer-events: none;
          }
        }

        .model_selection {
          width: 100%;

          .wrap {
            min-height: 36px;
          }
        }

        /* Forge-classic-neo specific dropdown styles */
        #setting_sd_modules,
        #forge_ui_preset,
        #forge_ui_dtype {
          width: 100%;

          > .container > .wrap {
            border: 1px solid ${token.colorBorderSecondary};
            border-radius: ${token.borderRadius}px;
            background: ${token.colorFillTertiary};

            &:focus-within {
              border-color: ${token.colorPrimary};
            }
          }

          .token {
            max-width: 100%;
            margin: 0;
            border-color: ${token.colorBorder};
            background: ${token.colorFillSecondary};
          }

          .wrap-inner {
            height: auto !important;
          }
        }

        /* Neo nests tokens inside wrap-inner and also renders this structure when empty.
           Override its viewport-sized model bar only inside the quick-settings sidebar. */
        #setting_sd_modules {
          > .container {
            display: block;
            min-width: 0;
          }

          .wrap-inner {
            gap: 4px;

            width: 100%;
            min-width: 0;
            height: auto !important;
            padding: 4px;
          }

          .token {
            cursor: default;

            flex: 0 1 auto;
            gap: 4px;

            min-width: 0;
            max-width: 100%;
            height: auto;
            min-height: 28px;
            padding: 2px 6px;

            > span {
              overflow: hidden;
              min-width: 0;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .token-remove {
              flex: 0 0 16px;
              margin-left: 0;
            }
          }

          .secondary-wrap {
            flex: 1 0 100%;
            gap: 4px;
            width: 100%;
            min-width: 0;
          }

          input {
            flex: 1 1 0%;

            width: 0;
            min-width: 0;
            height: 24px !important;
            margin: 0;
            padding: 0 4px;

            line-height: 1.5;
          }

          .remove-all {
            flex: 0 0 20px;
            margin: 0;
          }

          .icon-wrap {
            position: static;
            transform: none;

            flex: 0 0 20px;

            height: 20px;
            margin: 0 !important;
          }
        }
      }
    `,
  }),
);
