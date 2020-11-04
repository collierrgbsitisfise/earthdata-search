import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ArrowTags from '../../ArrowTags/ArrowTags'
import Button from '../../Button/Button'
import CollapsePanel from '../../CollapsePanel/CollapsePanel'
import CollectionDetailsBody from '../CollectionDetailsBody'
import CollectionDetailsMinimap from '../CollectionDetailsMinimap'
import SplitBadge from '../../SplitBadge/SplitBadge'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrides) {
  const {
    overrideMetadata = {},
    overrideProps = {}
  } = overrides || {}

  const props = {
    isActive: true,
    collectionMetadata: {
      hasAllMetadata: true,
      dataCenters: [],
      scienceKeywords: [],
      nativeFormats: [],
      urls: {
        html: {
          title: 'HTML',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.html'
        },
        native: {
          title: 'Native',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.native'
        },
        atom: {
          title: 'ATOM',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.atom'
        },
        echo10: {
          title: 'ECHO10',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.echo10'
        },
        iso19115: {
          title: 'ISO19115',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.iso19115'
        },
        dif: {
          title: 'DIF',
          href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.dif'
        },
        osdd: {
          title: 'OSDD',
          href: 'https://cmr.earthdata.nasa.gov/opensearch/granules/descriptor_document.xml?clientId=edsc-prod&shortName=1860_1993_2050_NITROGEN_830&versionId=1&dataCenter=ORNL_DAAC'
        },
        granuleDatasource: {
          title: 'CMR',
          href: 'https://cmr.earthdata.nasa.gov/search/granules.json?echo_collection_id=C179003620-ORNL_DAAC'
        }
      },
      ...overrideMetadata
    },
    onToggleRelatedUrlsModal: jest.fn(),
    ...overrideProps
  }

  const enzymeWrapper = shallow(<CollectionDetailsBody {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('CollectionDetails component', () => {
  test('renders itself correctly', () => {
    const { enzymeWrapper } = setup({
      overrideMetadata: {
        boxes: [
          '-90 -180 90 180'
        ],
        spatial: [
          'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
        ]
      }
    })

    expect(enzymeWrapper.type()).toBe('div')
    expect(enzymeWrapper.prop('className')).toBe('collection-details-body')
  })

  describe('MiniMap component', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          boxes: [
            '-90 -180 90 180'
          ],
          spatial: [
            'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
          ]
        }
      })

      expect(enzymeWrapper.find(CollectionDetailsMinimap).length).toEqual(1)
    })

    test('does not render if the collectionDetailsBody is not active', () => {
      const { enzymeWrapper } = setup({
        overrideProps: {
          isActive: false
        }
      })

      expect(enzymeWrapper.find(CollectionDetailsMinimap).length).toEqual(0)
    })

    test('has the correct props', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          boxes: [
            '-90 -180 90 180'
          ],
          spatial: [
            'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
          ]
        }
      })
      expect(enzymeWrapper.find(CollectionDetailsMinimap).props().metadata).toEqual({
        hasAllMetadata: true,
        boxes: [
          '-90 -180 90 180'
        ],
        dataCenters: [],
        scienceKeywords: [],
        nativeFormats: [],
        spatial: [
          'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
        ],
        urls: {
          html: {
            title: 'HTML',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.html'
          },
          native: {
            title: 'Native',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.native'
          },
          atom: {
            title: 'ATOM',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.atom'
          },
          echo10: {
            title: 'ECHO10',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.echo10'
          },
          iso19115: {
            title: 'ISO19115',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.iso19115'
          },
          dif: {
            title: 'DIF',
            href: 'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.dif'
          },
          osdd: {
            title: 'OSDD',
            href: 'https://cmr.earthdata.nasa.gov/opensearch/granules/descriptor_document.xml?clientId=edsc-prod&shortName=1860_1993_2050_NITROGEN_830&versionId=1&dataCenter=ORNL_DAAC'
          },
          granuleDatasource: {
            title: 'CMR',
            href: 'https://cmr.earthdata.nasa.gov/search/granules.json?echo_collection_id=C179003620-ORNL_DAAC'
          }
        }
      })
    })
  })

  describe('Spatial bounding', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          spatial: [
            'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
          ]
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__spatial-bounding').text()).toEqual(
        'Bounding Rectangle: (90.0°, -180.0°, -90.0°, 180.0°)'
      )
    })
  })

  describe('DOI Badge', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          doi: {
            doiLink: 'https://dx.doi.org/10.3334/ORNLDAAC/1569',
            doiText: '10.3334/ORNLDAAC/1569'
          }
        }
      })

      expect(enzymeWrapper.find(SplitBadge).length).toEqual(1)
    })

    test('has the correct props', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          doi: {
            doiLink: 'https://dx.doi.org/10.3334/ORNLDAAC/1569',
            doiText: '10.3334/ORNLDAAC/1569'
          }
        }
      })

      expect(enzymeWrapper.find(SplitBadge).props()).toEqual({
        className: null,
        primary: 'DOI',
        secondary: '10.3334/ORNLDAAC/1569',
        variant: 'primary'
      })
    })

    test('is wrapped in a link', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          doi: {
            doiLink: 'https://dx.doi.org/10.3334/ORNLDAAC/1569',
            doiText: '10.3334/ORNLDAAC/1569'
          }
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__doi').props().href).toEqual(
        'https://dx.doi.org/10.3334/ORNLDAAC/1569'
      )
    })
  })

  describe('Related URLs', () => {
    test('renders its links correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          relatedUrls: [
            {
              content_type: 'CollectionURL',
              label: 'Collection URL',
              urls: [
                {
                  description: 'Data set Landing Page DOI URL',
                  urlContentType: 'CollectionURL',
                  type: 'DATA SET LANDING PAGE',
                  url: 'https://doi.org/10.3334/ORNLDAAC/830',
                  subtype: ''
                }
              ]
            },
            {
              content_type: 'DistributionURL',
              label: 'Distribution URL',
              urls: [
                {
                  description: 'This link allows direct data access via Earthdata login',
                  urlContentType: 'DistributionURL',
                  type: 'GET DATA',
                  url: 'https://daac.ornl.gov/daacdata/global_climate/global_N_deposition_maps/',
                  subtype: ''
                },
                {
                  description: 'Web Coverage Service for this collection.',
                  urlContentType: 'DistributionURL',
                  type: 'USE SERVICE API',
                  subtype: 'WEB COVERAGE SERVICE (WCS)',
                  url: 'https://webmap.ornl.gov/wcsdown/dataset.jsp?ds_id=830',
                  get_service: {
                    mimeType: 'application/gml+xml',
                    protocol: 'Not provided',
                    fullName: 'Not provided',
                    dataId: 'NotProvided',
                    dataType: 'Not provided'
                  }
                }
              ]
            },
            {
              content_type: 'PublicationURL',
              label: 'Publication URL',
              urls: [
                {
                  description: 'ORNL DAAC Data Set Documentation',
                  urlContentType: 'PublicationURL',
                  type: 'VIEW RELATED INFORMATION',
                  subtype: 'GENERAL DOCUMENTATION',
                  url: 'https://daac.ornl.gov/CLIMATE/guides/global_N_deposition_maps.html'
                },
                {
                  description: 'Data Set Documentation',
                  urlContentType: 'PublicationURL',
                  type: 'VIEW RELATED INFORMATION',
                  subtype: 'GENERAL DOCUMENTATION',
                  url: 'https://daac.ornl.gov/daacdata/global_climate/global_N_deposition_maps/comp/deposition_maps.jpg'
                },
                {
                  description: 'Data Set Documentation',
                  urlContentType: 'PublicationURL',
                  type: 'VIEW RELATED INFORMATION',
                  subtype: 'GENERAL DOCUMENTATION',
                  url: 'https://daac.ornl.gov/daacdata/global_climate/global_N_deposition_maps/comp/global_N_deposition_maps.pdf'
                },
                {
                  description: 'Data Set Documentation',
                  urlContentType: 'PublicationURL',
                  type: 'VIEW RELATED INFORMATION',
                  subtype: 'GENERAL DOCUMENTATION',
                  url: 'https://daac.ornl.gov/daacdata/global_climate/global_N_deposition_maps/comp/global_N_deposition_maps_readme.pdf'
                }
              ]
            },
            {
              content_type: 'VisualizationURL',
              label: 'Visualization URL',
              urls: [
                {
                  description: 'Browse Image',
                  urlContentType: 'VisualizationURL',
                  type: 'GET RELATED VISUALIZATION',
                  url: 'https://daac.ornl.gov/graphics/browse/sdat-tds/830_1_fit.png',
                  subtype: ''
                }
              ]
            },
            {
              content_type: 'HighlightedURL',
              label: 'Highlighted URL',
              urls: [
                {
                  description: 'Data set Landing Page DOI URL',
                  urlContentType: 'CollectionURL',
                  type: 'DATA SET LANDING PAGE',
                  url: 'https://doi.org/10.3334/ORNLDAAC/830',
                  highlightedType: 'Data Set Landing Page'
                }
              ]
            }
          ]
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__related-link').at(0).props().href).toEqual(
        'https://doi.org/10.3334/ORNLDAAC/830'
      )
      expect(enzymeWrapper.find('.collection-details-body__related-link').at(0).text()).toEqual(
        'Data Set Landing Page'
      )
      expect(enzymeWrapper.find('.collection-details-body__related-link').at(1).find(Button).props().href).toEqual(null)
      expect(typeof enzymeWrapper.find('.collection-details-body__related-link').at(1).find(Button).props().onClick).toEqual('function')
      expect(enzymeWrapper.find('.collection-details-body__related-link').at(1).find(Button).props().bootstrapVariant).toEqual('link')
      expect(enzymeWrapper.find('.collection-details-body__related-link').at(2).props().href).toEqual(
        'https://cmr.earthdata.nasa.gov/search/concepts/C179003620-ORNL_DAAC.html'
      )
      expect(enzymeWrapper.find('.collection-details-body__related-link').at(2).text()).toEqual(
        'View More Info'
      )
    })
  })

  describe('Temporal Extent', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          temporal: [
            '1860-01-01 to 2050-12-31'
          ]
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__info').find('dd').at(1).text()).toEqual(
        '1860-01-01 to 2050-12-31'
      )
    })
  })

  describe('GIBS Layers', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          gibsLayers: [
            'None'
          ]
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__info').find('dd').at(1).text()).toEqual(
        'None'
      )
    })
  })

  describe('Supported Reformatting', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          services: {
            items: [
              {
                type: 'ECHO ORDERS',
                supportedOutputFormats: null,
                supportedReformattings: null
              },
              {
                type: 'ESI',
                supportedReformattings: [
                  {
                    supportedInputFormat: 'HDF-EOS2',
                    supportedOutputFormats: ['XML', 'ASCII', 'ICARTT']
                  },
                  {
                    supportedInputFormat: 'HDF-EOS5',
                    supportedOutputFormats: ['PNG', 'JPEG']
                  },
                  {
                    supportedInputFormat: 'HDF-EOS5',
                    supportedOutputFormats: ['TIFF']
                  }
                ]
              },
              {
                type: 'NOT PROVIDED',
                supportedOutputFormats: null,
                supportedReformattings: null
              }
            ]
          }
        }
      })

      const reformattingsDataElement = enzymeWrapper.find('.collection-details-body__info').find('dd').at(1)

      const format1 = reformattingsDataElement.find('.collection-details-body__reformatting-item').at(0)
      const format2 = reformattingsDataElement.find('.collection-details-body__reformatting-item').at(1)

      expect(format1.find('dt').text()).toEqual('HDF-EOS2<EDSCIcon />')
      expect(format2.find('dt').text()).toEqual('HDF-EOS5<EDSCIcon />')

      expect(format1.find('dd').text()).toEqual('XML, ASCII, ICARTT')
      expect(format2.find('dd').text()).toEqual('PNG, JPEG, TIFF')
    })
  })

  describe('Science Keywords', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          scienceKeywords: [
            ['Earth Science', 'Atmosphere', 'Atmospheric Chemistry']
          ]
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__keywords').find(ArrowTags).props()).toEqual({
        className: '',
        tags: ['Earth Science', 'Atmosphere', 'Atmospheric Chemistry']
      })
    })
  })

  describe('Data Formats', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          nativeFormats: ['PDF']
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__native-formats').text()).toEqual('PDF')
    })
  })

  describe('Summary', () => {
    test('renders correctly', () => {
      const { enzymeWrapper } = setup({
        overrideMetadata: {
          abstract: 'This data set provides global gridded estimates of atmospheric deposition of total inorganic nitrogen (N), NHx (NH3 and NH4+), and NOy (all oxidized forms of nitrogen other than N2O), in mg N/m2/year, for the years 1860 and 1993 and projections for the year 2050. The data set was generated using a global three-dimensional chemistry-transport model (TM3) with a spatial resolution of 5 degrees longitude by 3.75 degrees latitude (Jeuken et al., 2001; Lelieveld and Dentener, 2000). Nitrogen emissions estimates (Van Aardenne et al., 2001) and projection scenario data (IPCC, 1996; 2000) were used as input to the model.'
        }
      })

      expect(enzymeWrapper.find('.collection-details-body__abstract').text()).toEqual(
        'This data set provides global gridded estimates of atmospheric deposition of total inorganic nitrogen (N), NHx (NH3 and NH4+), and NOy (all oxidized forms of nitrogen other than N2O), in mg N/m2/year, for the years 1860 and 1993 and projections for the year 2050. The data set was generated using a global three-dimensional chemistry-transport model (TM3) with a spatial resolution of 5 degrees longitude by 3.75 degrees latitude (Jeuken et al., 2001; Lelieveld and Dentener, 2000). Nitrogen emissions estimates (Van Aardenne et al., 2001) and projection scenario data (IPCC, 1996; 2000) were used as input to the model.'
      )
    })
  })

  describe('"For Developers" Panel', () => {
    test('has the correct props', () => {
      const { enzymeWrapper } = setup()
      const children = enzymeWrapper.find(CollapsePanel).children()
      expect(enzymeWrapper.find(CollapsePanel).props().className).toEqual('collection-details-body__for-devs')
      expect(enzymeWrapper.find(CollapsePanel).props().header).toEqual('For Developers')
      expect(enzymeWrapper.find(CollapsePanel).props().panelClassName).toEqual('')
      expect(enzymeWrapper.find(CollapsePanel).props().scrollToBottom).toEqual(true)
      expect(children.find('.collection-details-body__dev-list a').length).toEqual(7)
    })
  })
})
