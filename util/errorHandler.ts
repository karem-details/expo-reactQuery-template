import { showErrorModal } from '@/context/ModalProvider';
import { apiErrorType } from '@/types/api';
import { AxiosError } from 'axios';
import { t } from 'i18next';

// Error Handler Class
export class ErrorHandler {
  // Handle query errors
  static handleQueryError(error: AxiosError<apiErrorType>) {
    console.error('Query error:', error);

    // Auth Error
    if (error?.response?.status === 401) {
      showErrorModal({
        title: t('errors.unauthorized'),
        content: t('errors.please_login_again'),
        confirmText: t('common.ok'),
        type: 'error',
      });
      return;
    }

    // Validation Error
    if (error?.response?.status === 422) {
      const errorData = error.response.data.errors;
      if (errorData) {
        const firstErrorKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstErrorKey][0];
        showErrorModal({
          title: t('errors.validation_error'),
          content: errorMessage,
          confirmText: t('common.ok'),
          type: 'error',
        });
        return;
      }
    }

    if (error?.response?.status === 404) {
      return;
    }

    // Get error message
    const errorMessage = this.getErrorMessage(error);
    showErrorModal({
      title: t('errors.error_fetching_data'),
      content: errorMessage,
      confirmText: t('common.ok'),
      type: 'error',
    });
  }

  // Handle mutation errors
  static handleMutationError(error: AxiosError<apiErrorType>) {
    console.error('Mutation error: ', error?.response);

    // Auth Error
    if (error?.response?.status === 401) {
      showErrorModal({
        title: t('errors.incorrect_credentials'),
        confirmText: t('common.ok'),
        type: 'error',
      });
      return;
    }

    // Validation Error
    if (error?.response?.status === 422) {
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const firstErrorKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstErrorKey][0];
        showErrorModal({
          title: t('errors.please_enter_data'),
          content: errorMessage,
          confirmText: t('common.ok'),
          type: 'error',
        });
        return;
      }
    } else {
      const errorMessage = this.getErrorMessage(error);
      showErrorModal({
        title: errorMessage,
        confirmText: t('common.ok'),
        type: 'error',
      });
      return;
    }
  }

  static getErrorMessage(error: AxiosError<apiErrorType>) {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    if (this.isNetworkError(error)) {
      return t('errors.network_connection_failed');
    }

    // Default error message
    return t('errors.unexpected_error');
  }

  static formatErrorMessage(message: string) {
    // Clean up common error messages
    if (message.includes('Network Error')) {
      return t('errors.network_connection_failed');
    }

    if (message.includes('timeout')) {
      return t('errors.request_timeout');
    }

    return message;
  }

  static isNetworkError(error: AxiosError) {
    return (
      error?.message === 'Network Error' ||
      !error?.response ||
      error?.code === 'ECONNABORTED'
    );
  }
}
