/**
 * Copyright 2025 davidklyons
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `ice-planner`
 * Enhanced interactive version with URL sharing
 */
export class IcePlanner extends DDDSuper(LitElement) {
  static get tag() {
    return "ice-planner";
  }

  static get properties() {
    return {
      teamName: { type: String },
      iceCost: { type: Number },
      hours: { type: Number },
      coachCost: { type: Number },
      jerseyCost: { type: Number },
      transactionPercent: { type: Number },
      transactionFlat: { type: Number },
      players: { type: Number },
      totalCost: { type: Number },
      costPerPlayer: { type: Number },
      shareLink: { type: String }
    };
  }

  constructor() {
    super();
    // Default values
    this.teamName = "My Hockey Team";
    this.iceCost = 300;
    this.hours = 50;
    this.coachCost = 3000;
    this.jerseyCost = 88;
    this.transactionPercent = 0.02;
    this.transactionFlat = 0.99;
    this.players = 1;
    this.totalCost = 0;
    this.costPerPlayer = 0;
    this.shareLink = "";
  }

  connectedCallback() {
    super.connectedCallback();
    // Load from URL parameters if present
    this._loadStateFromURL();
    this._updateCosts();
    // Generate share link immediately on load
    this._saveStateToURL();
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this[name] = name === "teamName" ? value : Number(value);
    this._updateCosts();
    this._saveStateToURL();
  }

  _updateCosts() {
    const baseCost =
      this.iceCost * this.hours + this.coachCost + this.jerseyCost;
    const transactionFee =
      baseCost * this.transactionPercent + this.transactionFlat;
    this.totalCost = baseCost + transactionFee;
    this.costPerPlayer = this.totalCost / this.players;
    this.requestUpdate();
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
          step="0.01"
          name="transactionPercent"
          .value=${this.transactionPercent * 100}
          @input=${(e) => {
            this.transactionPercent = parseFloat(e.target.value) / 100;
            this._updateCosts();
            this._saveStateToURL();
          }}
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
          min="1"
          name="players"
          .value=${this.players}
          @input=${this._handleInputChange}
        />

        <div class="results">
          <p><strong>Total Cost:</strong> $${this.totalCost.toFixed(2)}</p>
          <p class="total">
            <strong>Cost per Player:</strong> $${this.costPerPlayer.toFixed(2)}
          </p>
        </div>

        <div class="share">
          <p><strong>Share this plan:</strong></p>
          <input
            readonly
            value=${this.shareLink}
            @focus=${(e) => e.target.select()}
          />
          <button @click=${this._copyLink}>Copy Link</button>
        </div>
      </div>
    `;
  }

  // --- URL state management ---

  _saveStateToURL() {
    const params = new URLSearchParams({
      teamName: this.teamName,
      iceCost: this.iceCost,
      hours: this.hours,
      coachCost: this.coachCost,
      jerseyCost: this.jerseyCost,
      transactionPercent: this.transactionPercent,
      transactionFlat: this.transactionFlat,
      players: this.players,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    this.shareLink = url;
    window.history.replaceState({}, "", url);
  }

  _loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return false;

    this.teamName = params.get("teamName") || this.teamName;
    this.iceCost = Number(params.get("iceCost")) || this.iceCost;
    this.hours = Number(params.get("hours")) || this.hours;
    this.coachCost = Number(params.get("coachCost")) || this.coachCost;
    this.jerseyCost = Number(params.get("jerseyCost")) || this.jerseyCost;
    this.transactionPercent = Number(params.get("transactionPercent")) || this.transactionPercent;
    this.transactionFlat = Number(params.get("transactionFlat")) || this.transactionFlat;
    this.players = Number(params.get("players")) || this.players;

    return true;
  }

  _copyLink() {
    navigator.clipboard.writeText(this.shareLink).then(() => {
      alert("Link copied to clipboard!");
    });
  }

  static get styles() {
    return css`
      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 400px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
      }

      h2 {
        text-align: center;
        color: #2c3e50;
      }

      label {
        font-weight: bold;
      }

      input[type="text"],
      input[type="number"] {
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }

      .results {
        background: #f9f9f9;
        padding: 10px;
        border-radius: 8px;
        text-align: center;
        margin-top: 12px;
      }

      .share {
        margin-top: 12px;
      }

      .share input {
        width: 100%;
        font-size: 0.9em;
        padding: 6px;
        margin-bottom: 8px;
      }

      .share button {
        width: 100%;
        padding: 8px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
      }

      .share button:hover {
        background: #2980b9;
      }
    `;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);