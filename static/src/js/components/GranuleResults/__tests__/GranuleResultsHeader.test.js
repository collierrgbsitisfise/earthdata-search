import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { OverlayTrigger } from 'react-bootstrap'
import { FaFilter, FaTimes } from 'react-icons/fa'

import GranuleResultsHeader from '../GranuleResultsHeader'
import projections from '../../../util/map/projections'

import Skeleton from '../../Skeleton/Skeleton'

Enzyme.configure({ adapter: new Adapter() })

const windowEventMap = {}

beforeEach(() => {
  window.addEventListener = jest.fn((event, cb) => {
    windowEventMap[event] = cb
  })
  window.removeEventListener = jest.fn()
  window.requestAnimationFrame = jest.fn()
  window.cancelAnimationFrame = jest.fn()
})

function setup(overrideProps) {
  const props = {
    collectionMetadata: {
      title: 'Title',
      concept_id: 'collectionId'
    },
    collectionQuery: {},
    collectionsSearch: {
      isLoaded: true
    },
    focusedCollectionId: 'collectionId',
    location: {
      pathname: '/search/granules',
      search: '?test=search-value'
    },
    granuleQuery: {
      readableGranuleName: ['searchValue'],
      sortKey: '-start_date'
    },
    granuleSearchResults: {
      hits: null,
      loadTime: null,
      isLoading: true,
      isLoaded: false,
      allIds: [],
      byId: {}
    },
    mapProjection: projections.geographic,
    secondaryOverlayPanel: {
      isOpen: false
    },
    onApplyGranuleFilters: jest.fn(),
    onChangePanelView: jest.fn(),
    onToggleAboutCwicModal: jest.fn(),
    onToggleSecondaryOverlayPanel: jest.fn(),
    onUndoExcludeGranule: jest.fn(),
    pageNum: 1,
    panelView: 'list',
    ...overrideProps
  }

  const enzymeWrapper = shallow(<GranuleResultsHeader {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('GranuleResultsHeader component', () => {
  test('renders itself correctly', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.type()).toBe('div')
  })

  describe('granule list header', () => {
    describe('while loading', () => {
      test('renders the correct Skeleton elements', () => {
        const { enzymeWrapper } = setup({
          granuleQuery: {
            excludedGranuleIds: []
          },
          granuleSearchResults: {
            hits: null,
            loadTime: null,
            isLoading: true,
            isLoaded: false,
            allIds: [],
            byId: {}
          }
        })

        expect(enzymeWrapper.find('.granule-results-header__header-item').at(0).find(Skeleton).length).toEqual(1)
      })
    })

    describe('when loaded', () => {
      test('renders the correct visible granules and hits', () => {
        const { enzymeWrapper } = setup({
          granuleQuery: {
            excludedGranuleIds: []
          },
          granuleSearchResults: {
            hits: 23,
            loadTime: 1524,
            isLoading: false,
            isLoaded: true,
            allIds: [
              123,
              456
            ],
            byId: {
              123: {
                title: '123'
              },
              456: {
                title: '456'
              }
            }
          }
        })

        expect(enzymeWrapper.find('.granule-results-header__header-item').at(0).text()).toEqual('Showing 2 of 23 matching granules')
      })
    })
  })

  test('renders a title', () => {
    const { enzymeWrapper } = setup()
    const title = enzymeWrapper.find('.granule-results-header__title')

    expect(title.text()).toEqual('Title')
  })

  test('renders the granule sort', () => {
    const { enzymeWrapper } = setup()
    const element = enzymeWrapper.find('#input__sort-granules')

    expect(element.length).toEqual(1)
  })

  test('renders the granule search', () => {
    const { enzymeWrapper } = setup()
    const element = enzymeWrapper.find('#input__granule-search')

    expect(element.length).toEqual(1)
  })

  test('renders the granule search with a tooltip', () => {
    const { enzymeWrapper } = setup()
    const overlayTrigger = enzymeWrapper.find(OverlayTrigger)

    expect(overlayTrigger.length).toEqual(1)
  })

  describe('handleUpdateSortOrder', () => {
    test('sets the state correctly', () => {
      const { enzymeWrapper } = setup()
      const mockEvent = {
        target: {
          value: 'start_date_oldest_first'
        }
      }
      enzymeWrapper.find('#input__sort-granules').simulate('change', mockEvent)

      expect(enzymeWrapper.state()).toEqual({
        prevSearchValue: 'searchValue',
        searchValue: 'searchValue',
        sortOrder: 'start_date_oldest_first'
      })
    })

    test('fires the onApplyGranuleFilters', () => {
      const { enzymeWrapper, props } = setup()
      const mockEvent = {
        target: {
          value: 'start_date_oldest_first'
        }
      }
      enzymeWrapper.find('#input__sort-granules').simulate('change', mockEvent)

      expect(props.onApplyGranuleFilters).toHaveBeenCalledTimes(1)
      expect(props.onApplyGranuleFilters).toHaveBeenCalledWith({ sortKey: 'start_date_oldest_first' })
    })
  })

  describe('handleUpdateSearchValue', () => {
    test('sets the state correctly', () => {
      const { enzymeWrapper } = setup()
      const mockEvent = {
        target: {
          value: 'Some-new-value'
        }
      }
      enzymeWrapper.find('#input__granule-search').simulate('change', mockEvent)

      enzymeWrapper.update()

      expect(enzymeWrapper.state()).toEqual({
        prevSearchValue: 'searchValue',
        searchValue: 'Some-new-value',
        sortOrder: '-start_date'
      })
    })
  })

  describe('handleBlurSearchValue', () => {
    test('fires the onApplyGranuleFilters', () => {
      const { enzymeWrapper, props } = setup()
      const mockEvent = {
        target: {
          value: 'Some-new-value'
        }
      }
      enzymeWrapper.find('#input__granule-search').simulate('change', mockEvent)
      enzymeWrapper.find('#input__granule-search').simulate('blur')

      expect(props.onApplyGranuleFilters).toHaveBeenCalledTimes(1)
      expect(props.onApplyGranuleFilters).toHaveBeenCalledWith({ readableGranuleName: ['Some-new-value'] })
    })

    test('removes the parameter if the input is empty', () => {
      const { enzymeWrapper, props } = setup()
      const mockEvent = {
        target: {
          value: ''
        }
      }
      enzymeWrapper.find('#input__granule-search').simulate('change', mockEvent)
      enzymeWrapper.find('#input__granule-search').simulate('blur')

      expect(props.onApplyGranuleFilters).toHaveBeenCalledTimes(1)
      expect(props.onApplyGranuleFilters).toHaveBeenCalledWith({
        readableGranuleName: []
      })
    })
  })
})

describe('handleUndoExcludeGranule', () => {
  test('fires onUndoExcludeGranule', () => {
    const { enzymeWrapper, props } = setup()

    // Exclude a granule to test undo button
    enzymeWrapper.setProps({
      granuleQuery: {
        excludedGranuleIds: ['granuleId1', 'granuleId2']
      },
      collectionMetadata: {
        title: 'Title',
        concept_id: 'collectionId'
      }
    })

    enzymeWrapper.find('.granule-results-header__granule-undo-button').simulate('click')

    expect(props.onUndoExcludeGranule).toHaveBeenCalledTimes(1)
    expect(props.onUndoExcludeGranule).toHaveBeenCalledWith('collectionId')
  })
})

describe('granuleFilters link', () => {
  describe('when filters are not active', () => {
    test('displays correct icon when filters are not active', () => {
      const { enzymeWrapper } = setup({
        secondaryOverlayPanel: {
          isOpen: false
        }
      })
      expect(enzymeWrapper.find('.granule-results-header__link').prop('icon')).toEqual(FaFilter)
    })

    test('fires the correct callback on click', () => {
      const { enzymeWrapper, props } = setup({
        secondaryOverlayPanel: {
          isOpen: false
        }
      })
      enzymeWrapper.find('.granule-results-header__link').simulate('click')
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledTimes(1)
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledWith(true)
    })
  })

  describe('when filters are not active', () => {
    test('displays correct icon when filters are active', () => {
      const { enzymeWrapper } = setup({
        secondaryOverlayPanel: {
          isOpen: true
        }
      })
      expect(enzymeWrapper.find('.granule-results-header__link').prop('icon')).toEqual(FaTimes)
    })

    test('fires the correct callback on click', () => {
      const { enzymeWrapper, props } = setup({
        secondaryOverlayPanel: {
          isOpen: true
        }
      })
      enzymeWrapper.find('.granule-results-header__link').simulate('click')
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledTimes(1)
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledWith(false)
    })
  })

  describe('when the g key is pressed', () => {
    test('toggles the granule panel state correctly', () => {
      const preventDefaultMock = jest.fn()
      const stopPropagationMock = jest.fn()

      const { props } = setup({
        secondaryOverlayPanel: {
          isOpen: true
        }
      })

      // Test thats the panel starts open
      expect(props.secondaryOverlayPanel.isOpen).toEqual(true)

      // Trigger the simulated window event
      windowEventMap.keyup({
        key: 'g',
        tagName: 'body',
        type: 'keyup',
        preventDefault: preventDefaultMock,
        stopPropagation: stopPropagationMock
      })

      // Test that the panel is toggled and the event propagation has been prevented
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledTimes(1)
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledWith(false)
      expect(preventDefaultMock).toHaveBeenCalledTimes(1)
      expect(stopPropagationMock).toHaveBeenCalledTimes(1)
    })

    test('does not toggle granule panel when not on the granules page', () => {
      const preventDefaultMock = jest.fn()
      const stopPropagationMock = jest.fn()

      const { props } = setup({
        location: {
          pathname: '/search'
        },
        secondaryOverlayPanel: {
          isOpen: false
        }
      })

      // Test thats the panel starts closed
      expect(props.secondaryOverlayPanel.isOpen).toEqual(false)

      // Trigger the simulated window event
      windowEventMap.keyup({
        key: 'g',
        tagName: 'body',
        type: 'keyup',
        preventDefault: preventDefaultMock,
        stopPropagation: stopPropagationMock
      })

      // Test that the panel is not toggled the event propagating
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledTimes(0)
      expect(props.onToggleSecondaryOverlayPanel).toHaveBeenCalledTimes(0)
      expect(preventDefaultMock).toHaveBeenCalledTimes(0)
      expect(stopPropagationMock).toHaveBeenCalledTimes(0)
    })

  });
})
