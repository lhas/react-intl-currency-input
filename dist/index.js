"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _formatCurrency = require("./format-currency");

var _formatCurrency2 = _interopRequireDefault(_formatCurrency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultConfig = {
  locale: "en-US",
  formats: {
    number: {
      USD: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
};

var IntlCurrencyInput = function (_Component) {
  _inherits(IntlCurrencyInput, _Component);

  function IntlCurrencyInput(props) {
    _classCallCheck(this, IntlCurrencyInput);

    var _this = _possibleConstructorReturn(this, (IntlCurrencyInput.__proto__ || Object.getPrototypeOf(IntlCurrencyInput)).call(this, props));

    _this.setMaskedValue = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _this.setState({
        maskedValue: (0, _formatCurrency2.default)(value, _this.props.config, _this.props.currency)
      });
    };

    _this.normalizeValue = function (str) {
      // strips everything that is not a number (positive or negative).
      return Number(str.replace(/[^0-9-]/g, ""));
    };

    _this.updateValues = function (event) {
      var _event = _extends({}, event);

      // value must be divided by 100 to properly work with cents.
      var value = _this.normalizeValue(event.target.value) / 100;
      var maskedValue = (0, _formatCurrency2.default)(value, _this.props.config, _this.props.currency);

      _this.setState({
        maskedValue: maskedValue
      });

      return [value, maskedValue];
    };

    _this.handleChange = function (event) {
      event.preventDefault();

      var _this$updateValues = _this.updateValues(event),
          _this$updateValues2 = _slicedToArray(_this$updateValues, 2),
          value = _this$updateValues2[0],
          maskedValue = _this$updateValues2[1];

      if (_this.props.onChange) {
        _this.props.onChange(event, value, maskedValue);
      }
    };

    _this.handleBlur = function (event) {
      var _this$updateValues3 = _this.updateValues(event),
          _this$updateValues4 = _slicedToArray(_this$updateValues3, 2),
          value = _this$updateValues4[0],
          maskedValue = _this$updateValues4[1];

      if (_this.props.autoReset) {
        _this.setMaskedValue();
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event, value, maskedValue);
      }
    };

    _this.handleFocus = function (event) {
      if (_this.props.autoSelect) {
        event.target.select();
      }

      var _this$updateValues5 = _this.updateValues(event),
          _this$updateValues6 = _slicedToArray(_this$updateValues5, 2),
          value = _this$updateValues6[0],
          maskedValue = _this$updateValues6[1];

      if (_this.props.onFocus) {
        _this.props.onFocus(event, value, maskedValue);
      }
    };

    _this.handleKeyPress = function (event) {
      if (_this.props.onKeyPress) {
        _this.props.onKeyPress(event, event.key, event.keyCode);
      }
    };

    _this.handleInputRef = function (input) {
      var element = _reactDom2.default.findDOMNode(input);
      var isActive = element === document.activeElement;

      if (element && !isActive) {
        if (_this.props.autoFocus) {
          element.focus();
        }
      }

      return element;
    };

    _this.handleValue = function () {
      return _this.state.maskedValue;
    };

    _this.allowedProps = function () {
      var allowedProps = _extends({}, _this.props);

      delete allowedProps.currency;
      delete allowedProps.config;
      delete allowedProps.autoSelect;
      delete allowedProps.autoFocus;
      delete allowedProps.autoReset;
      delete allowedProps.onChange;
      delete allowedProps.onKeyPress;
      delete allowedProps.onBlur;
      delete allowedProps.onFocus;

      return allowedProps;
    };

    _this.state = {
      maskedValue: "0"
    };
    return _this;
  }

  _createClass(IntlCurrencyInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.defaultValue || 0;
      this.setMaskedValue(value);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextProps === this.props && nextState === this.state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("input", _extends({}, this.allowedProps(), {
        value: this.handleValue(),
        ref: function ref(input) {
          return _this2.input = _this2.handleInputRef(input);
        },
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyUp: this.handleKeyPress
      }));
    }
  }]);

  return IntlCurrencyInput;
}(_react.Component);

;

IntlCurrencyInput.propTypes = {
  currency: _react2.default.PropTypes.string.isRequired,
  config: _react2.default.PropTypes.object.isRequired,
  defaultValue: _react2.default.PropTypes.number,
  autoFocus: _react2.default.PropTypes.bool,
  autoSelect: _react2.default.PropTypes.bool,
  autoReset: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onKeyPress: _react2.default.PropTypes.func
};

IntlCurrencyInput.defaultProps = {
  currency: "USD",
  config: defaultConfig,
  autoFocus: false,
  autoSelect: false,
  autoReset: false
};

exports.default = IntlCurrencyInput;