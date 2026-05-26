import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }, { headerHeight = 64, width }: { headerHeight?: number; width: number }) => ({
    container: css`
      height: calc(100vh - ${headerHeight}px);

      ul.options {
        > li {
          max-width: ${width - 48}px;
        }
      }

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

        span:not(.icon-wrap) {
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
        }

        /* Forge-classic-neo specific dropdown styles */
        #setting_sd_modules,
        #forge_ui_preset,
        #forge_ui_dtype {
          width: 100%;

          .wrap {
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

          .wrap .wrap-inner {
            height: auto !important;
          }
        }

        .model_selection {
          width: 100%;

          .wrap {
            min-height: 36px;
          }
        }
      }
    `,
  }),
);
