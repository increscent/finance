import React from "react";
import {withRouter} from "react-router-dom";
import BudgetSelect from "./BudgetSelect.js";
import Form from "../Components/Form.js";
import FormValidationMessages from "../Components/FormValidationMessages.js";
import mixin from "mixin";
import DebitCreditRadioButtons from "./DebitCreditRadioButtons.js";
import Store from "../../Store.js";

class AddTransactionForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: props.transaction_type || "credit",
      from: props.from || this.getDefaultFrom(),
      to: props.to || "@Debit",
      motive: props.motive || "",
      amount: props.amount || "",
      validation_messages: []
    };

    this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
    this.setDefaultFrom = this.setDefaultFrom.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTransactionDelete = this.handleTransactionDelete.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  setDefaultFrom() {
    if (this.state.from) this.forceUpdate();
    this.setState({
      from: this.getDefaultFrom()
    });
  }

  componentDidMount() {
    this.storeListenerId = Store.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    Store.unRegisterListener(this.storeListenerId);
  }

  handleTransactionDelete(e) {
    e.preventDefault();
    Store.deleteTransaction(this.props.uri)
    .then(() => {
      this.props.history.goBack();
    })
    .catch(error => {
      this.setState({
        validation_messages: [error.toString()]
      });
    });
  }

  getDefaultFrom() {
    return Store.budgets[0]? Store.budgets[0].name : "";
  }

  handleTransactionTypeChange(transaction_type) {
    var from = "@Credit";
    var to = "Other";
    if (transaction_type == "debit") {
      var from = this.getDefaultFrom();
      var to = "@Debit";
    }
    this.setState({
      transaction_type: transaction_type,
      from: from,
      to: to
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var rules = [
      {name: "transaction_type", validate: (x) => x == "debit" || x == "credit", error_message: "Please select a transaction type."},
      {name: "from", validate: (x) => x, error_message: "Please select a category."},
      {name: "motive", validate: (x) => true, error_message: "It doesn\'t matter what note you write."},
      {name: "amount", validate: (x) => parseFloat(x), error_message: "Please enter a valid amount."},
      {name: "amount", validate: (x) => parseFloat(x) && parseFloat(x) > 0, error_message: "Transaction amount must be a positive number."}
    ];

    var error_messages = this.validateFormInput(rules);
    this.setState({
      validation_messages: error_messages
    });

    if (!error_messages.length) {
      // validation successful
      var transaction = {
        from: this.state.transaction_type == "credit"? "@Credit":this.state.from,
        to: this.state.transaction_type == "credit"? "Other":"@Debit",
        motive: this.state.motive.trim(),
        amount: parseFloat(this.state.amount)
      };

      var request;
      if (this.props.uri) {
        transaction._id = this.props.uri;
        request = Store.updateTransaction(transaction);
      } else {
        request = Store.addTransaction(transaction);
      }

      request
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({
          validation_messages: [error.toString()]
        })
      });
    }
  }

  render() {
    return (
      <form id="addTransactionForm" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <DebitCreditRadioButtons transaction_type={this.state.transaction_type} onTransactionTypeChange={this.handleTransactionTypeChange} />
        </div>

        <div className="form-group">
          {
            this.state.transaction_type == "debit" &&
            <BudgetSelect budgets={Store.budgets} from={this.state.from} onChange={(e) => this.handleFormInput("from", e)} />
          }
        </div>

        <div className="form-group">
          $<input type="text" name="amount" placeholder="Amount" className="form-control amount" value={this.state.amount} onChange={(e) => this.handleFormInput("amount", e)} />
        </div>

        <div className="form-group">
          <input type="text" name="motive" placeholder="Note" className="form-control" value={this.state.motive} onChange={(e) => this.handleFormInput("motive", e)} />
        </div>

        <div className="form-group">
          <input type="submit" name="submit" value="save" className="btn btn-primary" />
        </div>

        {
          this.props.uri &&
          <div className="form-group">
            <a href="#" className="text-danger" onClick={this.handleTransactionDelete}>delete transaction</a>
          </div>
        }

        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

export default withRouter(AddTransactionForm);
