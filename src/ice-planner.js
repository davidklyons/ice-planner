// Import Lit for building web components
import { LitElement, html, css } from 'https://unpkg.com/lit@3?module';

// Hockey team cost calculator web component
export class IcePlanner extends LitElement {
  // HTML tag name for this component
  static get tag() {
    return 'ice-planner';
  }

  // Set up default values
  constructor() {
    super();
    this.teamName = '';
    this.iceCostPerHour = 0;
    this.iceHours = 0;
    this.coachCost = 0;
    this.jerseyCost = 0;
    this.transitionFeePercent = 5; // 5% fee
    this.transitionFeeFixed = 0.99; // fixed $0.99
    this.numberOfPlayers = 0;
    this.costPerPlayer = 0;
    this.totalCost = 0;
  }

  // Define reactive properties that trigger re-render when changed
  static get properties() {
    return {
      teamName: { type: String },
      iceCostPerHour: { type: Number },
      iceHours: { type: Number },
      coachCost: { type: Number },
      jerseyCost: { type: Number },
      transitionFeePercent: { type: Number },
      transitionFeeFixed: { type: Number },
      numberOfPlayers: { type: Number },
      costPerPlayer: { type: Number },
      totalCost: { type: Number },
    };
  }

  // Handle form input changes
  _handleTeamName(e) {
    this.teamName = e.target.value;
  }

  _handleIceCost(e) {
    this.iceCostPerHour = parseFloat(e.target.value) || 0;
    this.calculateCosts();
  }

  _handleIceHours(e) {
    this.iceHours = parseFloat(e.target.value) || 0;
    this.calculateCosts();
  }

  _handleCoachCost(e) {
    this.coachCost = parseFloat(e.target.value) || 0;
    this.calculateCosts();
  }

  _handleJerseyCost(e) {
    this.jerseyCost = parseFloat(e.target.value) || 0;
    this.calculateCosts();
  }

  _handleNumPlayers(e) {
    this.numberOfPlayers = parseInt(e.target.value) || 0;
    this.calculateCosts();
  }

  // Calculate total hockey team costs with transition fees
  calculateCosts() {
    const iceTotal = this.iceCostPerHour * this.iceHours;
    const subtotal = iceTotal + this.coachCost + this.jerseyCost;
    const transitionFee = (subtotal * (this.transitionFeePercent / 100)) + this.transitionFeeFixed;
    this.totalCost = subtotal + transitionFee;
    // Avoid division by zero
    this.costPerPlayer = this.numberOfPlayers > 0 ? this.totalCost / this.numberOfPlayers : 0;
  }

  // Reset form to default values
  reset() {
    this.teamName = '';
    this.iceCostPerHour = 0;
    this.iceHours = 0;
    this.coachCost = 0;
    this.jerseyCost = 0;
    this.numberOfPlayers = 0;
    this.costPerPlayer = 0;
    this.totalCost = 0;
  }

  // CSS styles scoped to this component only (Shadow DOM)
  static get styles() {
    return css`
      /* :host targets the web component element itself */
      :host {
        display: block;
        padding: 20px;
      }
      
      .wrapper {
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
      
      h2 {
        color: #333;
        font-size: 1.5rem;
        margin: 0 0 20px 0;
        text-align: center;
        border-bottom: 3px solid #0066cc;
        padding-bottom: 10px;
      }
      
      .form-section {
        margin-bottom: 20px;
      }
      
      .form-section h3 {
        color: white;
        font-size: 1.2rem;
        margin: 0 0 10px 0;
        background-color: #0066cc;
        padding: 10px 15px;
        border-radius: 5px;
        text-align: center;
      }
      
      .team-name {
        margin-bottom: 20px;
      }
      
      .team-name label {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      
      .team-name input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        color: #333;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
      }
      
      .team-name input:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
      }
      
      .team-name small {
        display: block;
        margin-top: 5px;
        font-size: 12px;
        color: #666;
      }
      
      .costs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }
      
      .input-group {
        margin: 10px 0;
      }
      
      .input-group label {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      
      .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        color: #333;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
      }
      
      .input-group input:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
      }
      
      .results {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
        margin-top: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      .results h3 {
        color: white;
        font-size: 1.2rem;
        margin: 0 0 10px 0;
        text-align: center;
        background-color: #28a745;
        padding: 10px 15px;
        border-radius: 5px;
      }
      
      .cost-item {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 16px;
      }
      
      .cost-item:last-child {
        border-bottom: none;
        font-weight: bold;
        font-size: 1.2rem;
        background-color: #0066cc;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin-top: 10px;
      }
      
      .empty-state {
        text-align: center;
        padding: 40px;
        color: #666;
      }
      
      .empty-state p {
        margin: 10px 0;
        font-style: italic;
      }
      
      .buttons {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        justify-content: center;
      }
      
      button {
        padding: 10px 20px;
        border: 1px solid #0066cc;
        border-radius: 4px;
        background-color: #0066cc;
        color: white;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      button:hover {
        background-color: #0052a3;
        transform: translateY(-1px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      
      button.secondary {
        background-color: #6c757d;
        border-color: #6c757d;
        color: white;
      }
      
      button.secondary:hover {
        background-color: #5a6268;
        border-color: #5a6268;
      }
      
      button.share {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
      }
      
      button.share:hover {
        background-color: #218838;
        border-color: #218838;
      }
      
      @media (max-width: 768px) {
        :host {
          padding: 10px;
        }
        
        .wrapper {
          padding: 10px;
        }
        
        .costs-grid {
          grid-template-columns: 1fr;
          gap: 10px;
        }
        
        .buttons {
          flex-direction: column;
          gap: 15px;
        }
        
        button {
          width: 100%;
        }
        
        h2 {
          font-size: 1.3rem;
        }
        
        .cost-item {
          flex-direction: column;
          text-align: left;
          gap: 5px;
        }
        
        .cost-item span:last-child {
          font-weight: bold;
        }
      }
    `;
  }


  // Returns the HTML template for this component
  render() {
    return html`
      <div class="wrapper">
        <h2>🏒 Ice Planner</h2>
        
        <div class="form-section">
          <h3>Team Information</h3>
          <div class="team-name">
            <label>Team Name</label>
            <input 
              type="text" 
              .value="${this.teamName}"
              @input="${this._handleTeamName}"
              placeholder="Enter team name"
            />
          </div>
        </div>
        
        <div class="form-section">
          <h3>Costs</h3>
          <div class="costs-grid">
            <div class="input-group">
              <label>Ice Cost per Hour ($)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" 
                     .value="${this.iceCostPerHour}" @input="${this._handleIceCost}">
            </div>
            
            <div class="input-group">
              <label>Hours of Ice Time</label>
              <input type="number" step="0.5" min="0" placeholder="0" 
                     .value="${this.iceHours}" @input="${this._handleIceHours}">
            </div>
            
            <div class="input-group">
              <label>Coach Cost ($)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" 
                     .value="${this.coachCost}" @input="${this._handleCoachCost}">
            </div>
            
            <div class="input-group">
              <label>Jersey Cost ($)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" 
                     .value="${this.jerseyCost}" @input="${this._handleJerseyCost}">
            </div>
            
            <div class="input-group">
              <label>Number of Players</label>
              <input type="number" step="1" min="1" placeholder="0" 
                     .value="${this.numberOfPlayers}" @input="${this._handleNumPlayers}">
            </div>
          </div>
        </div>
        
        <div class="results">
          <h3>Cost Breakdown</h3>
          <div id="results-content">
            ${this.totalCost > 0 && this.numberOfPlayers > 0 ? html`
              <div class="cost-item">
                <span>Ice time (${this.iceHours} hours × $${this.iceCostPerHour.toFixed(2)})</span>
                <span>$${(this.iceCostPerHour * this.iceHours).toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Coach cost</span>
                <span>$${this.coachCost.toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Jersey cost</span>
                <span>$${this.jerseyCost.toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Subtotal</span>
                <span>$${((this.iceCostPerHour * this.iceHours) + this.coachCost + this.jerseyCost).toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Transition fee (${this.transitionFeePercent}% + $${this.transitionFeeFixed})</span>
                <span>$${(((this.iceCostPerHour * this.iceHours) + this.coachCost + this.jerseyCost) * (this.transitionFeePercent / 100) + this.transitionFeeFixed).toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Total cost</span>
                <span>$${this.totalCost.toFixed(2)}</span>
              </div>
              <div class="cost-item">
                <span>Cost per player</span>
                <span>$${this.costPerPlayer.toFixed(2)}</span>
              </div>
            ` : html`
              <div class="empty-state">
                Fill out the form above to see your cost breakdown.
              </div>
            `}
          </div>
        </div>
        
        <div class="buttons">
          <button @click="${this.reset}">Reset</button>
        </div>
      </div>
    `;
  }
}

// Register the web component so <ice-planner> tags work in HTML
globalThis.customElements.define(IcePlanner.tag, IcePlanner);
