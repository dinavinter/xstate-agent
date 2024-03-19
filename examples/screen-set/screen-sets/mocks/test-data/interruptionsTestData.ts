import {GSErrors} from '../../../../../src/core/Gigya.Js/app/GSErrors';
import {DefaultScreenID} from '../../lib/screen-sets/template/screen-template';

export const InterruptionsTestData = [
  {
    screen: 'reset password',
    errorCode: GSErrors.PENDING_PASSWORD_CHANGE,
    screenId: DefaultScreenID.MandatoryPasswordChange
  }, {
    screen: 'complete registration',
    errorCode: GSErrors.ACCOUNT_PENDING_REGISTRATION,
    screenId: DefaultScreenID.CompleteRegistration
  }, {
    screen: 'TFA verification',
    errorCode: GSErrors.ACCOUNT_PENDING_TFA_VERIFICATION,
    screenId: DefaultScreenID.TFAVerification
  }, {
    screen: 'pending verification',
    errorCode: GSErrors.ACCOUNT_PENDING_VERIFICATION,
    screenId: DefaultScreenID.VerificationPending
  }, {
    screen: 'TFA registration',
    errorCode: GSErrors.ACCOUNT_PENDING_TFA_REGISTRATION,
    screenId: DefaultScreenID.TFARegistration
  }]
