import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LndSyncing from 'components/LndSyncing'
import GlobalError from 'components/GlobalError'
import LoadingBolt from 'components/LoadingBolt'
import Form from 'components/Form'
import ModalRoot from 'components/ModalRoot'
import Nav from 'components/Nav'
import Wallet from 'components/Wallet'
import styles from './App.scss'

class App extends Component {
  componentWillMount() {
    const { fetchTicker, fetchBalance, fetchInfo, newAddress, lnd: { syncing } } = this.props

    fetchTicker()
    fetchBalance()
    fetchInfo()
    newAddress('p2pkh')
  }

  render() {
    const {
      lnd,
      syncPercentage,
      fetchBlockHeight,

      modal: { modalType, modalProps },
      hideModal,
      ticker,
      currentTicker,
      address: { address },
      balance,
      info,
      form,

      openPayForm,
      openRequestForm,
      formProps,
      closeForm,

      error: { error },
      clearError,

      children
    } = this.props

    if (!currentTicker || balance.balanceLoading) { return <LoadingBolt /> }

    return (
      <div>
        <GlobalError error={error} clearError={clearError} />
        <ModalRoot
          modalType={modalType}
          modalProps={modalProps}
          hideModal={hideModal}
          currentTicker={currentTicker}
          currency={ticker.currency}
        />

        <Form formType={form.formType} formProps={formProps} closeForm={closeForm} />

        <Nav
          openPayForm={openPayForm}
          openRequestForm={openRequestForm}
        />

        <div className={styles.content}>
          <Wallet
            balance={balance}
            address={address}
            info={info}
          />
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  lnd: PropTypes.object.isRequired,

  syncPercentage: PropTypes.number.isRequired,
  fetchBlockHeight: PropTypes.func.isRequired,

  modal: PropTypes.object.isRequired,
  ticker: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  formProps: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,

  newAddress: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  fetchTicker: PropTypes.func.isRequired,
  fetchBalance: PropTypes.func.isRequired,
  openPayForm: PropTypes.func.isRequired,
  openRequestForm: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,

  currentTicker: PropTypes.object,


  children: PropTypes.object.isRequired
}

export default App
