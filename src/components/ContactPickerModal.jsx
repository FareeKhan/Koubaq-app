import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
import Contacts from 'react-native-contacts';
import CustomModal from './CustomModal';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo'
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { useTranslation } from 'react-i18next';
import EmptyData from './EmptyData';
import CustomText from './CustomText';

const ContactPickerModal = ({ setContactModal, contactModal, selectedContacts, setSelectedContacts }) => {
    const { t } = useTranslation()

    const [contacts, setContacts] = useState([]);
    const [searchText, setSearchText] = useState('');

    const searchContact = searchText ? contacts?.filter((item) => item?.givenName?.toLowerCase()?.includes(searchText?.toLowerCase())) : contacts

    useEffect(() => {
        requestPermissionAndLoadContacts();
    }, []);

    const requestPermissionAndLoadContacts = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'This app needs access to your contacts.',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                loadContacts();
            } else {
                Alert.alert('Permission Denied', 'Cannot access contacts');
            }
        } else {
            loadContacts();
        }
    };


    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                setContacts(contacts);
            })
            .catch(err => {
                console.log('Error loading contacts: ', err);
            });
    };

    const toggleContactSelection = (contact) => {
        setContactModal(false)
        setSelectedContacts(prev => {
            // If already selected, remove it
            if (prev.find(c => c.recordID === contact.recordID)) {
                return prev.filter(c => c.recordID !== contact.recordID);
            }
            return [...prev, contact];
        });
    };


    const renderItem = ({ item }) => {
        const phoneNumber = item.phoneNumbers[0]?.number || 'No number';
        const isSelected = selectedContacts.some(c => c.recordID === item.recordID);

        return (
            <TouchableOpacity onPress={() => toggleContactSelection(item)} style={[styles.contactItem,]}>
                <View>
                    <CustomText style={styles.contactName}>{item.givenName} {item.familyName}</CustomText>
                    <CustomText style={styles.contactNumber}>{phoneNumber}</CustomText>
                </View>
                {
                    isSelected &&
                    <Entypo name={'check'} color={colors.black} size={20} />
                }
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <CustomModal
                setModalVisible={setContactModal}
                modalVisible={contactModal}
                textStyle={{
                    textAlign: 'center',
                    fontSize: 17,
                    color: colors.primary,
                    fontFamily: fonts.bold,
                }}
                modalHeight={true}
                title={'Contacts List'}
            >
                <View style={{ marginBottom: 30 }}>
                    <CustomInput
                        placeholder={t('search')}
                        rs={true}
                        icon={true}
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <FlatList
                        // data={contacts}
                        data={searchContact}
                        keyExtractor={item => item.recordID}
                        renderItem={renderItem}
                        style={{ height: 400 }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={<EmptyData title={t('noContact')} />}
                    />
                    {
                        searchContact?.length > 0 &&
                        <CustomButton
                            title={'confirm'}
                            onPress={() => setContactModal(false)}
                        />
                    }

                </View>


            </CustomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', marginBottom: 100 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    contactItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    contactName: { fontSize: 18 },
    contactNumber: { fontSize: 14, color: '#555' },
    searchInput: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: colors.gray5
    },
});

export default ContactPickerModal;
