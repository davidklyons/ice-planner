/**
 * Copyright 2025 davidklyons
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `ice-planner`
 * A simple team ice cost calculator app
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(LitElement) {
  static get tag() {
    return "ice-planner";
  }

  constructor() {
    super();
    // Default values per requirements
    this.teamName = "My Hockey Team";
    this.iceCost = 300;
    this.hours = 50;
    this.coachCost = 3000;
    this.jerseyCost = 88;
    this.transactionPercent = 0.02;
    this.transactionFlat = 0.99;
    this.players = 1;
  }

  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      iceCost: { type: Number },
      hours: { type: Number },
      coachCost: { type: Number },
      jerseyCost: { type: Number },
      transactionPercent: { type: Number },
      transactionFlat: { type: Number },
      players: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          padding: var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-lg);
        }

        h2 {
          text-align: center;
          color: var(--ddd-theme-default-coalyGray);
        }

        label {
          display: block;
          margin-top: var(--ddd-spacing-2);
          font-weight: var(--ddd-font-weight-bold);
        }

        input {
          width: 100%;
          padding: var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-md);
          font-size: var(--ddd-font-size-s);
          margin-bottom: var(--ddd-spacing-2);
        }

        .results {
          margin-top: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-md);
          background-color: var(--ddd-theme-default-skyBlue);
          color: var(--ddd-theme-default-coalyGray);
        }

        .total {
          font-weight: bold;
          font-size: var(--ddd-font-size-l);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            background-color: var(--ddd-theme-default-coalyGray);
            color: var(--ddd-theme-default-white);
          }
          .results {
            background-color: var(--ddd-theme-default-carbon);
            color: var(--ddd-theme-default-white);
          }
        }
      `,
    ];
  }

  _handleInputChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this[field] = value ? parseFloat(value) || value : 0;
  }

  get totalCost() {
    const ice = this.iceCost * this.hours;
    const subtotal = ice + this.coachCost + this.jerseyCost;
    const transactionFee = subtotal * this.transactionPercent + this.transactionFlat;
    return subtotal + transactionFee;
  }

  get costPerPlayer() {
    return this.players > 0 ? this.totalCost / this.players : 0;
  }

  render() {
    return html`
      <div class="wrapper">
        <h2>${this.teamName} Ice Planner</h2>

        <label>Team Name</label>
        <input
          type="text"
          name="teamName"
          .value=${this.teamName}
          @input=${this._handleInputChange}
        />

        <label>Ice Cost per Hour ($)</label>
        <input
          type="number"
          name="iceCost"
          .value=${this.iceCost}
          @input=${this._handleInputChange}
        />

        <label>Total Hours</label>
        <input
          type="number"
          name="hours"
          .value=${this.hours}
          @input=${this._handleInputChange}
        />

        <label>Coach Cost ($)</label>
        <input
          type="number"
          name="coachCost"
          .value=${this.coachCost}
          @input=${this._handleInputChange}
        />

        <label>Jersey Cost ($)</label>
        <input
          type="number"
          name="jerseyCost"
          .value=${this.jerseyCost}
          @input=${this._handleInputChange}
        />

        <label>Transaction Fee (%)</label>
        <input
          type="number"
          name="transactionPercent"
          step="0.01"
          .value=${this.transactionPercent}
          @input=${(e) => (this.transactionPercent = parseFloat(e.target.value) / 100)}
        />

        <label>Flat Transaction Fee ($)</label>
        <input
          type="number"
          name="transactionFlat"
          .value=${this.transactionFlat}
          @input=${this._handleInputChange}
        />

        <label>Number of Players</label>
        <input
          type="number"
          name="players"
          min="1"
          .value=${this.players}
          @input=${this._handleInputChange}
        />

        <div class="results">
          <p><strong>Total Cost:</strong> $${this.totalCost.toFixed(2)}</p>
          <p class="total">Cost per Player: $${this.costPerPlayer.toFixed(2)}</p>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);
