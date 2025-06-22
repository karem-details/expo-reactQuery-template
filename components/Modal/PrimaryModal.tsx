import { useModal } from '@/hooks/useModal';
import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryText from '../Text/PrimaryText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

const PrimaryModal: React.FC = () => {
  const { isVisible, config, hideModal } = useModal();
  const { t } = useTranslation();
  if (!config) {
    return null;
  }

  const {
    title,
    content,
    confirmText = t('common.ok'),
    cancelText,
    onConfirm,
    onCancel,
    type = 'info',
  } = config;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    hideModal();
  };

  const getTypeColor = (): string => {
    switch (type) {
      case 'success':
        return Colors.primary;
      case 'warning':
        return '#FFC107';
      case 'error':
        return Colors.red;
      case 'info':
      default:
        return '#2196F3';
    }
  };

  const getIconName = (): keyof typeof AntDesign.glyphMap => {
    switch (type) {
      case 'success':
        return 'checkcircle';
      case 'warning':
        return 'exclamationcircle';
      case 'error':
        return 'closecircle';
      case 'info':
      default:
        return 'infocirlce';
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={hideModal}
      statusBarTranslucent={true}
      //style={{ flex: 1 }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AntDesign name={getIconName()} size={50} color={getTypeColor()} />
          {title && (
            <PrimaryText
              fontFamily='Bold'
              style={[styles.modalTitle, { color: Colors.text }]}
              text={title}
            />
          )}
          {content && (
            <PrimaryText
              text={content}
              fontSize={12}
              style={styles.modalText}
            />
          )}
          <View style={styles.buttonContainer}>
            {cancelText && (
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancel}
              >
                <PrimaryText
                  style={styles.buttonTextCancel}
                  text={cancelText}
                  fontSize={13}
                  fontFamily='Bold'
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonConfirm,
                { backgroundColor: getTypeColor() },
                !cancelText && { width: '100%' },
              ]}
              onPress={handleConfirm}
            >
              <PrimaryText
                style={styles.buttonTextConfirm}
                text={confirmText}
                fontSize={13}
                fontFamily='Bold'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '80%',
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonConfirm: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonTextConfirm: {
    color: 'white',
    textAlign: 'center',
  },
  buttonTextCancel: {
    color: '#555',
    textAlign: 'center',
  },
});

export default PrimaryModal;
