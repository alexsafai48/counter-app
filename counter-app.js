/**
 * Copyright 2026 alexsafai48
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `counter-app`
 *
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(LitElement) {

  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--ddd-spacing-6);
          gap: var(--ddd-spacing-4);
        }

        .number {
          font-size: 72px;
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-coalyGray);
          min-width: 80px;
          text-align: center;
          transition: color 0.3s ease;
        }

        .number.at-18 {
          color: var(--ddd-theme-default-inventionOrange);
        }

        .number.at-21 {
          color: var(--ddd-theme-default-wonderPurple);
        }

        .number.at-min {
          color: var(--ddd-theme-default-pughBlue);
        }

        .number.at-max {
          color: var(--ddd-theme-default-original87Pink);
        }

        .btn-group {
          display: flex;
          gap: var(--ddd-spacing-4);
        }

        button {
          width: 48px;
          height: 48px;
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          border: 2px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-md);
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }

        button:hover:not(:disabled) {
          background-color: var(--ddd-theme-default-limestoneLight);
          box-shadow: var(--ddd-boxShadow-sm);
        }

        button:focus:not(:disabled) {
          outline: 3px solid var(--ddd-theme-default-pughBlue);
          outline-offset: 2px;
        }

        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `,
    ];
  }

  get _numberClass() {
    if (this.counter === this.min) return "number at-min";
    if (this.counter === this.max) return "number at-max";
    if (this.counter === 21) return "number at-21";
    if (this.counter === 18) return "number at-18";
    return "number";
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="wrapper">
          <div class="${this._numberClass}">${this.counter}</div>
          <div class="btn-group">
            <button
              @click="${this.decrement}"
              ?disabled="${this.counter === this.min}"
              aria-label="Decrement"
            >-</button>
            <button
              @click="${this.increment}"
              ?disabled="${this.counter === this.max}"
              aria-label="Increment"
            >+</button>
          </div>
        </div>
      </confetti-container>
    `;
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("counter")) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      () => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

customElements.define("counter-app", CounterApp);
