import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .gradio-dropdown {
    .wrap,
    input {
      cursor: pointer;
    }

    .container .wrap {
      .wrap-inner input {
        font-size: var(--text-sm);
        line-height: 0;
      }
    }

    /* Multiselect dropdown styles */
    &:has(.wrap > .token) {
      .wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;

        min-height: var(--button-lg-tool-height);
        padding: 4px 8px;
      }

      .token {
        cursor: default;

        display: inline-flex;
        gap: 4px;
        align-items: center;

        padding: 2px 8px;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusSM}px;

        font-size: var(--text-xs);
        line-height: 1.5;
        color: ${token.colorText};

        background: ${token.colorFillSecondary};

        &:hover {
          border-color: ${token.colorBorder};
          background: ${token.colorFill};
        }

        .token-remove {
          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 14px;
          height: 14px;
          margin-left: 2px;
          padding: 0;
          border: none;
          border-radius: 50%;

          font-size: 10px;
          line-height: 1;
          color: ${token.colorTextTertiary};

          background: transparent;

          &:hover {
            color: ${token.colorText};
            background: ${token.colorFill};
          }
        }
      }

      input {
        flex: 1;

        min-width: 60px;
        height: auto;
        padding: 0;
        border: none;

        background: transparent;
      }
    }
  }

  .dropdown-arrow {
    margin: 0 !important;
  }

  ul.options {
    display: block !important;

    margin: 0 !important;
    padding: 4px !important;
    border: 1px solid ${token.colorBorder} !important;
    border-radius: ${token.borderRadius}px !important;

    background: ${token.colorBgElevated} !important;
    box-shadow: ${token.boxShadow};

    li {
      overflow: hidden;
      display: block !important;

      padding: 4px 8px !important;
      border-radius: ${token.borderRadiusSM}px !important;

      line-height: 1 !important;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.selected {
        color: ${token.colorText} !important;
        background: ${token.colorFill} !important;
      }

      &.active:not(.selected) {
        color: black !important;
        background: ${token.yellow} !important;
      }

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillSecondary} !important;
      }
    }
  }
`;
