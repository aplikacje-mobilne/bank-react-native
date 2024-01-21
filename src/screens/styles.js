import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 5,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    marginBottom: 16,

  },
  sectionContainerp1: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTOP: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    marginBottom: 16,
    flexDirection: 'row',
    
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 15,
    margin:10,
    fontSize: 20,
    fontWeight: 'normal',
    color: '#333',
  },
  sectionDescription: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#666',
    paddingLeft: '11%',
  },
  bottomBar: {
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  bottomBarText: {
    color: '#888',
    marginTop: 1,
  },
  paymentText: {
    color: '#f60',
    marginTop: 1,
  },
  input: {
    height: 60,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  check: {
    width:80,
    backgroundColor: '#FF570C',
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
    alignSelf: 'flex-end',
  },
  pp:{
    color: 'white',
  },
  tabBarLabel: {
    fontSize: 12,
    color: '#606470',
    marginBottom: 5,
    fontWeight: '400',
  },
  tabBarLabelFocused: {
    fontSize: 14,
    color: '#FF570C',
    marginBottom: 5,

    fontWeight: '600',
  },
  tabBar: {
    height: 65,
  },
  tabBarIcon: {
    fontWeight: 100, 
  },
});